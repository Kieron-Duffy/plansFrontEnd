import React from 'react';

import {
  BrandProvider as ConstellationBrandProvider,
  useWindowSize,
} from '@constellation/core';
import { BrowserRouter } from '@interstellar/react-app-routing';
import { render } from '@testing-library/react';

import HeaderComponent from './HeaderComponent';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import header from '../../content/_base/header';
import { Brand } from '../brandProvider/BrandProvider';

jest.mock('@interstellar/react-app-content', () => ({
  useContent: jest.fn(() => ({ ...header })),
}));

jest.mock('@constellation/core', () => ({
  ...jest.requireActual('@constellation/core'),
  useWindowSize: jest.fn(),
}));

describe('Header', () => {
  it('renders Header with feedback and support link with base logo', () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 60 });
    renderWithTheme(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>,
      { BRAND_NAME: Brand.LLOYDS },
    );
  });

  it('renders Header with feedback and support link with wide logo', () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1630 });
    renderWithTheme(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>,
      { BRAND_NAME: Brand.LLOYDS },
    );
  });

  it('renders Header with feedback and support link with no logo', () => {
    const theme: any = {};

    (useWindowSize as jest.Mock).mockReturnValue({ width: 1630 });
    render(
      <ConstellationBrandProvider theme={theme}>
        <BrowserRouter>
          <HeaderComponent />
        </BrowserRouter>
      </ConstellationBrandProvider>,
    );
  });

  it('renders Header when logo exists but has no base or wide variant', () => {
    const theme: any = {
      assets: {
        logo: {},
      },
    };

    (useWindowSize as jest.Mock).mockReturnValue({ width: 1630 });
    render(
      <ConstellationBrandProvider theme={theme}>
        <BrowserRouter>
          <HeaderComponent />
        </BrowserRouter>
      </ConstellationBrandProvider>,
    );
  });
});
