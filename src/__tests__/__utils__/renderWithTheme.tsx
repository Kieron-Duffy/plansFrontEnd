import React, {
  PropsWithChildren,
  useMemo,
  ReactNode,
  ReactElement,
} from 'react';

import { render, RenderResult } from '@testing-library/react';

import AppConfig from '../../components/appConfig/AppConfig';
import AppConfigContext from '../../components/appConfig/AppConfigContext';
import BrandProvider, { Brand } from '../../components/brandProvider';

const DEFAULT_MOCK_APP_CONFIG = {
  BRAND_NAME: Brand.LLOYDS,
  IS_WEBVIEW: 'false',
};

function MockedComp({
  children,
  ...overrides
}: PropsWithChildren<Partial<AppConfig>>): ReactElement {
  const value = useMemo(
    () => ({ ...DEFAULT_MOCK_APP_CONFIG, ...overrides }),
    [overrides],
  );
  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

const renderWithTheme = (
  children: ReactNode,
  overrides: Partial<AppConfig>,
): RenderResult =>
  render(
    <BrandProvider brand={overrides.BRAND_NAME ?? Brand.LLOYDS}>
      <MockedComp {...overrides}>{children}</MockedComp>
    </BrandProvider>,
  );

export default renderWithTheme;
