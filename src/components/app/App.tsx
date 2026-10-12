import React, { ReactElement } from 'react';

import { ContentProvider } from '@interstellar/react-app-content';
import AppLayout from 'components/appLayout/Applayout';

import content from '../../content';
import Routes from '../../routes';
import getThemeFromUrl from '../../utils/getThemeFromUrl';
import useAppConfig from '../appConfig/useAppConfig';
import BrandProvider, { Brand } from '../brandProvider';

function App(): ReactElement {
  const configBrand = useAppConfig().BRAND_NAME;
  const brand: Brand = getThemeFromUrl() || configBrand || Brand.LLOYDS;

  return (
    <BrandProvider brand={brand}>
      <ContentProvider value={content({ brand }).layoutContent}>
        <AppLayout>
          <Routes />
        </AppLayout>
      </ContentProvider>
    </BrandProvider>
  );
}

export default App;
