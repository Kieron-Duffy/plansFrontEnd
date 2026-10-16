import React, { ReactElement } from 'react';

import { ContentProvider } from '@interstellar/react-app-content';
import { Routes, Route } from '@interstellar/react-app-routing';
import { Brand } from 'components/brandProvider/BrandProvider';

import HomePage from 'routes/HomePage/HomePage';
import GetPlanProgress from 'routes/getPlanProgress/getPlanProgress';
import * as routes from './manifest';
import content from '../content';
import NotFound from './notFound/NotFound';
import useAppConfig from '../components/appConfig/useAppConfig';
import getThemeFromUrl from '../utils/getThemeFromUrl';

function App(): ReactElement {
  const brandConfig = useAppConfig().BRAND_NAME;
  const brand = getThemeFromUrl() || brandConfig || Brand.LLOYDS;
  const pageContent = content({ brand });

  return (
    <Routes>
      <Route
        path={routes.Home}
        element={
          <ContentProvider value={pageContent.homepage}>
            <HomePage />
          </ContentProvider>
        }
      />

      <Route
        path={routes.GetPlanProgress}
        element={
          <ContentProvider value={pageContent.homepage}>
            <GetPlanProgress />
          </ContentProvider>
        }
      />

      <Route
        path="*"
        element={
          <ContentProvider value={pageContent.notfound}>
            <NotFound />
          </ContentProvider>
        }
      />
    </Routes>
  );
}

export default App;
