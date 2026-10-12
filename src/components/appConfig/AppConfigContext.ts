import React from 'react';

import { Brand } from 'components/brandProvider/BrandProvider';

import AppConfig from './AppConfig';

const DEFAULT_APP_CONFIG: AppConfig = {
  BRAND_NAME: Brand.LLOYDS,
  IS_WEBVIEW: 'false',
};

export default React.createContext<AppConfig>(DEFAULT_APP_CONFIG);
