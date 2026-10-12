import React from 'react';

import { lloydsTheme } from '@constellation/themes';
import { render, screen } from '@testing-library/react';

import { useTheme } from './useTheme';
import BrandProvider, { Brand } from '../components/brandProvider';

function ThemeConsumer() {
  const theme = useTheme();

  return <div>{theme === lloydsTheme ? 'lloyds' : 'provided'}</div>;
}

describe('useTheme', () => {
  it('returns lloyds theme when no BrandProvider is present', () => {
    render(<ThemeConsumer />);

    expect(screen.getByText('lloyds')).toBeInTheDocument();
  });

  it('returns provided theme from BrandProvider', () => {
    render(
      <BrandProvider brand={Brand.HALIFAX}>
        <ThemeConsumer />
      </BrandProvider>,
    );

    expect(screen.getByText('provided')).toBeInTheDocument();
  });
});
