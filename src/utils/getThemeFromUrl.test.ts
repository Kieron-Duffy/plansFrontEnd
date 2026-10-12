import getThemeFromUrl from './getThemeFromUrl';
import { Brand } from '../components/brandProvider';

describe('getThemeFromUrl', () => {
  const originalURLSearchParams = global.URLSearchParams;

  afterEach(() => {
    global.URLSearchParams = originalURLSearchParams;
  });

  const mockURLSearchParams = (themeValue: string | null) => {
    global.URLSearchParams = jest.fn().mockImplementation(() => ({
      get: jest.fn().mockReturnValue(themeValue),
    })) as unknown as typeof URLSearchParams;
  };

  describe('valid theme values', () => {
    it('should return Brand.BOS when theme=bos', () => {
      mockURLSearchParams('bos');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.BOS);
    });

    it('should return Brand.BOS_2025 when theme=bos2025', () => {
      mockURLSearchParams('bos2025');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.BOS_2025);
    });

    it('should return Brand.HALIFAX when theme=halifax', () => {
      mockURLSearchParams('halifax');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.HALIFAX);
    });

    it('should return Brand.LLOYDS when theme=lloyds', () => {
      mockURLSearchParams('lloyds');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.LLOYDS);
    });

    it('should return Brand.LLOYDS_2023 when theme=lloyds2023', () => {
      mockURLSearchParams('lloyds2023');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.LLOYDS_2023);
    });

    it('should return Brand.MBNA when theme=mbna', () => {
      mockURLSearchParams('mbna');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.MBNA);
    });

    it('should return Brand.SCOTTISH_WIDOWS when theme=sw', () => {
      mockURLSearchParams('sw');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.SCOTTISH_WIDOWS);
    });

    it('should return Brand.BIRMINGHAM_MIDSHIRES when theme=bm', () => {
      mockURLSearchParams('bm');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.BIRMINGHAM_MIDSHIRES);
    });

    it('should return Brand.BLACK_HORSE when theme=bh', () => {
      mockURLSearchParams('bh');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.BLACK_HORSE);
    });
  });

  describe('invalid or missing theme values', () => {
    it('should return undefined when no theme parameter is present', () => {
      mockURLSearchParams(null);

      const result = getThemeFromUrl();

      expect(result).toBeUndefined();
    });

    it('should return undefined when theme parameter is empty', () => {
      mockURLSearchParams('');

      const result = getThemeFromUrl();

      expect(result).toBeUndefined();
    });

    it('should return undefined for invalid theme value', () => {
      mockURLSearchParams('invalid-theme');

      const result = getThemeFromUrl();

      expect(result).toBeUndefined();
    });

    it('should return undefined when theme parameter has wrong case', () => {
      mockURLSearchParams('LLOYDS');

      const result = getThemeFromUrl();

      expect(result).toBeUndefined();
    });
  });

  describe('with other query parameters', () => {
    it('should correctly extract theme when other params are present', () => {
      mockURLSearchParams('halifax');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.HALIFAX);
    });

    it('should handle theme as first parameter with others following', () => {
      mockURLSearchParams('bos');

      const result = getThemeFromUrl();

      expect(result).toBe(Brand.BOS);
    });
  });
});
