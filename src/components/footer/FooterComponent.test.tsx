import React from 'react';

import FooterComponent from './FooterComponent';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../brandProvider/BrandProvider';

describe('Footer', () => {
  it('renders Footer with text and link', () => {
    renderWithTheme(<FooterComponent />, { BRAND_NAME: Brand.LLOYDS });
  });
});
