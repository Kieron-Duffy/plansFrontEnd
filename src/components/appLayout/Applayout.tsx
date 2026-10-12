import React from 'react';

import { Page, Main } from '@constellation/core';

import LayoutProps from './Applayout.types';
import useAppConfig from '../appConfig/useAppConfig';
import Footer from '../footer/FooterComponent';
import Header from '../header/HeaderComponent';

function AppLayout({ children }: LayoutProps): React.JSX.Element {
  const isConfigWebView = useAppConfig().IS_WEBVIEW === 'true';
  const urlParams = new URLSearchParams(window.location.search);
  const webview = isConfigWebView || urlParams.get('isWebview') === 'true';

  return (
    <Page>
      {!webview && <Header  />}
      <Main>{children}</Main>
      {!webview && <Footer />}
    </Page>
  );
}

export default AppLayout;
