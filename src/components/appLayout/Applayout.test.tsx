import React from 'react';

import { BrowserRouter } from '@interstellar/react-app-routing';
import { Brand } from 'components/brandProvider';

import AppLayout from './Applayout';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import content from '../../content/_base';

jest.mock('@interstellar/react-app-content', () => ({
  useContent: jest.fn(() => ({ appcontent: { ...content.layoutContent } })),
}));
describe('layout', () => {
  it('renders the layout header, footer and childeren', () => {
    const screen = renderWithTheme(
      <BrowserRouter>
        <AppLayout>Test Heading</AppLayout>
      </BrowserRouter>,
      {
        BRAND_NAME: Brand.LLOYDS,
      },
    );
    const containerChildren = screen.getByText('Test Heading');
    expect(containerChildren).toBeInTheDocument();
  });
});
