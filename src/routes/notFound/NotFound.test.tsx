import React from 'react';

import { BrowserRouter } from '@interstellar/react-app-routing';

import NotFound from './NotFound';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../../components/brandProvider';
import notfound from '../../content/_base/notfound';

jest.mock('@interstellar/react-app-content', () => ({
  useContent: jest.fn(() => ({ ...notfound })),
}));

describe('layout', () => {
  it('renders the no page found heading', () => {
    const screen = renderWithTheme(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
      { BRAND_NAME: Brand.LLOYDS },
    );
    const screenText = screen.getByText('Problem loading page');
    expect(screenText).toBeInTheDocument();
  });

  it('renders the no page found sub heading', () => {
    const screen = renderWithTheme(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
      { BRAND_NAME: Brand.LLOYDS },
    );
    const screenText = screen.getByText(
      "Sorry, the page you're looking for can't be found.",
    );
    expect(screenText).toBeInTheDocument();
  });
});
