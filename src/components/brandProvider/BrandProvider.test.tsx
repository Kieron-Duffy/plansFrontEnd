import React, { ReactElement } from 'react';

import {
  bos2025Theme,
  blackHorseTheme,
  birminghamMidshiresTheme,
  bosTheme,
  halifaxTheme,
  lloydsTheme,
  lloyds2023Theme,
  mbnaTheme,
  scottishWidowsTheme,
} from '@constellation/themes';
import { render } from '@testing-library/react';

import BrandProvider from './BrandProvider';

import { Brand } from '.';

const mockConstellationBrandProvider = jest.fn();

interface BrandProviderProps {
  theme: Brand;
  children: ReactElement;
}

jest.mock('@constellation/core', () => ({
  BrandProvider: ({ theme, children }: BrandProviderProps): ReactElement => {
    mockConstellationBrandProvider(theme);
    return <div>{children}</div>;
  },
}));

describe('BrandProvider', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('Resolves a brand name to the correct corrlating theme and provides it to the Constellaiton BrandProvider', () => {
    it(`should set ${Brand.BOS} brand within the context and render the data with correct context`, () => {
      render(<BrandProvider brand={Brand.BOS}>Test {Brand.BOS}</BrandProvider>);
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(bosTheme),
      );
    });

    it(`should set ${Brand.BOS_2025} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.BOS_2025}>
          Test {Brand.BOS_2025}
        </BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(bos2025Theme),
      );
    });

    it(`should set ${Brand.HALIFAX} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.HALIFAX}>
          Test {Brand.HALIFAX}
        </BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(halifaxTheme),
      );
    });

    it(`should set ${Brand.LLOYDS} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.LLOYDS}>Test {Brand.LLOYDS}</BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(lloydsTheme),
      );
    });

    it(`should set ${Brand.LLOYDS} brand within the context and render the data with correct context`, () => {
      render(<BrandProvider brand={null}>Test {Brand.LLOYDS}</BrandProvider>);
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(lloydsTheme),
      );
    });

    it(`should set ${Brand.MBNA} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.MBNA}>Test {Brand.MBNA}</BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(mbnaTheme),
      );
    });

    it(`should set ${Brand.SCOTTISH_WIDOWS} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.SCOTTISH_WIDOWS}>
          Test {Brand.SCOTTISH_WIDOWS}
        </BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(scottishWidowsTheme),
      );
    });

    it(`should set ${Brand.BIRMINGHAM_MIDSHIRES} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.BIRMINGHAM_MIDSHIRES}>
          Test {Brand.BIRMINGHAM_MIDSHIRES}
        </BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(birminghamMidshiresTheme),
      );
    });

    it(`should set ${Brand.LLOYDS_2023} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.LLOYDS_2023}>
          Test {Brand.LLOYDS_2023}
        </BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(lloyds2023Theme),
      );
    });

    it(`should set ${Brand.BLACK_HORSE} brand within the context and render the data with correct context`, () => {
      render(
        <BrandProvider brand={Brand.BLACK_HORSE}>
          Test {Brand.BLACK_HORSE}
        </BrandProvider>,
      );
      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(blackHorseTheme),
      );
    });

    it('should fall back to lloyds theme when URL theme is invalid and brand is null', () => {
      window.history.replaceState(null, '', '/?theme=invalid');

      render(<BrandProvider brand={null}>Fallback theme</BrandProvider>);

      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(lloydsTheme),
      );
    });

    it('should fall back to lloyds theme when brand key is unsupported at runtime', () => {
      render(
        <BrandProvider brand={'unsupported-brand' as Brand}>
          Fallback theme
        </BrandProvider>,
      );

      expect(mockConstellationBrandProvider).toHaveBeenCalledWith(
        expect.objectContaining(lloydsTheme),
      );
    });
  });
});
