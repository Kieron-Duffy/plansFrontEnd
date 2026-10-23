import React from 'react';

import { screen } from '@testing-library/react';

import Page from './HomePage';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../../components/brandProvider';
import homePage from '../../content/_base/homepage';

jest.mock('@interstellar/react-app-content', () => ({
  useContent: jest.fn(() => ({ ...homePage })),
}));

describe('Page', () => {
  it('renders the home buying plan form', () => {
    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(
      screen.getByRole('heading', { name: "Let's put a plan into action" }),
    ).toBeInTheDocument();
  });
});
