import React from 'react';

import { BrowserRouter } from '@interstellar/react-app-routing';
import { createRoot } from 'react-dom/client';

import App from './components/app/App';
import AppConfigContext from './components/appConfig/AppConfigContext';
import getAppBase from './utils/getAppBase';

const mount = (
  containerElement: Element | DocumentFragment,
  customProps = {},
) => {
  const root = createRoot(containerElement);
  const appBasePath = getAppBase();
  /* eslint-disable no-console */
  console.log('customProps: ', customProps);
  root.render(
    <AppConfigContext.Provider value={(window as any).appConfig}>
      <BrowserRouter basename={appBasePath}>
        <App />
      </BrowserRouter>
    </AppConfigContext.Provider>,
  );
};

const container = document.getElementById('app');

if (process.env.NODE_ENV === 'development' || container) {
  if (container) {
    mount(container, { isRemote: false });
  }
}

export { mount };
