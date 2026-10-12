/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "http://myapp.oncp.cloud/test-pathname"}
 */

import getAppBase from './getAppBase';

describe('getAppBase', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Reset pathname to original value
    window.history.replaceState(null, '', '/test-pathname');
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('in development mode', () => {
    it('should return appConfig.BASE_PATH', () => {
      process.env.NODE_ENV = 'development';

      Object.assign(window, {
        appConfig: {
          BASE_PATH: '/dev-base-path',
        },
      });

      const result = getAppBase();

      expect(result).toBe('/dev-base-path');
    });
  });

  describe('in production mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    describe('when on internal hosting (hostname matches INTERNAL_HOSTNAMES)', () => {
      it('should return appConfig.BASE_PATH since isReverseProxy is always false', () => {
        // jsdom URL hostname is myapp.oncp.cloud which matches default 'oncp.cloud'
        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/app-base-path',
            IS_REVERSE_PROXY: 'true',
            EXTERNAL_BASEPATH: '/external',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/app-base-path');
      });

      it('should return appConfig.BASE_PATH with custom INTERNAL_HOSTNAMES matching hostname', () => {
        process.env.INTERNAL_HOSTNAMES = 'oncp.cloud,custom.internal';

        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/internal-base',
            IS_REVERSE_PROXY: 'true',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/internal-base');

        delete process.env.INTERNAL_HOSTNAMES;
      });
    });

    describe('when on external hosting (hostname does not match INTERNAL_HOSTNAMES)', () => {
      beforeEach(() => {
        // Set INTERNAL_HOSTNAMES to values that don't match jsdom hostname (myapp.oncp.cloud)
        process.env.INTERNAL_HOSTNAMES = 'nomatch.internal,other.internal';
      });

      afterEach(() => {
        delete process.env.INTERNAL_HOSTNAMES;
      });

      it('should return EXTERNAL_BASEPATH with trailing slash when IS_REVERSE_PROXY is true and EXTERNAL_BASEPATH is set', () => {
        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/base-path',
            IS_REVERSE_PROXY: 'true',
            EXTERNAL_BASEPATH: '/ext-path',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/ext-path/');
      });

      it('should strip trailing slash from EXTERNAL_BASEPATH before appending one', () => {
        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/base-path',
            IS_REVERSE_PROXY: 'true',
            EXTERNAL_BASEPATH: '/ext-path/',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/ext-path/');
      });

      it('should return window.location.pathname when IS_REVERSE_PROXY is true but EXTERNAL_BASEPATH is not set', () => {
        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/base-path',
            IS_REVERSE_PROXY: 'true',
          },
        });

        window.history.replaceState(null, '', '/from-location');

        const result = getAppBase();

        expect(result).toBe('/from-location');
      });

      it('should return appConfig.BASE_PATH when IS_REVERSE_PROXY is false', () => {
        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/base-path',
            IS_REVERSE_PROXY: 'false',
            EXTERNAL_BASEPATH: '/ext-path',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/base-path');
      });

      it('should return appConfig.BASE_PATH when IS_REVERSE_PROXY is not set', () => {
        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/base-path',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/base-path');
      });

      it('should use default INTERNAL_HOSTNAMES when env value is empty', () => {
        process.env.INTERNAL_HOSTNAMES = '';

        Object.assign(window, {
          appConfig: {
            BASE_PATH: '/base-path',
            IS_REVERSE_PROXY: 'true',
            EXTERNAL_BASEPATH: '/external-base',
          },
        });

        const result = getAppBase();

        expect(result).toBe('/base-path');
      });
    });
  });
});
