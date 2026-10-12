import React from 'react';

import { MemoryRouter } from '@interstellar/react-app-routing';

import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../brandProvider';
import App from './App';

jest.mock('@interstellar/nga-bridge-react', () => ({
  useNgaBridgeWrapper: jest.fn().mockImplementation(() => ({
    isIos: jest.fn(),
    isAndroid: jest.fn(),
    closeCwaJourney: jest.fn(),
    hideSpinner: jest.fn(),
    showSpinner: jest.fn(),
    onFinish: jest.fn(),
  })),
}));

describe('App', () => {
  it('renders Lloyds blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.LLOYDS },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders BOS blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.BOS },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders MBNA blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.MBNA },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders Halifax blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.HALIFAX },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders Scottish Widows blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.SCOTTISH_WIDOWS },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders Birmingham Midshires blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.BIRMINGHAM_MIDSHIRES },
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders Black Horse blank template', () => {
    const route = '/';
    const { asFragment } = renderWithTheme(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
      { BRAND_NAME: Brand.BLACK_HORSE },
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
