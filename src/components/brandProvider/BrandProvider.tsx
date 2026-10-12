import React from 'react';

import { BrandProvider as ConstellationBrandProvider } from '@constellation/core';
import {
  birminghamMidshiresTheme,
  blackHorseTheme,
  bos2025Theme,
  bosTheme,
  halifaxTheme,
  lloydsTheme,
  lloyds2023Theme,
  mbnaTheme,
  scottishWidowsTheme,
  type Theme,
} from '@constellation/themes';

import '@constellation/themes/bh.fonts.css';
import '@constellation/themes/bm.fonts.css';
import '@constellation/themes/bos.fonts.css';
import '@constellation/themes/bos2025.fonts.css';
import '@constellation/themes/halifax.fonts.css';
import '@constellation/themes/lloyds.fonts.css';
import '@constellation/themes/lloyds2023.fonts.css';
import '@constellation/themes/mbna.fonts.css';
import '@constellation/themes/sw.fonts.css';
import GlobalStyle from './GlobalStyles';

export enum Brand {
  BOS = 'bos',
  BOS_2025 = 'bos2025',
  HALIFAX = 'halifax',
  LLOYDS = 'lloyds',
  LLOYDS_2023 = 'lloyds2023',
  MBNA = 'mbna',
  SCOTTISH_WIDOWS = 'sw',
  BIRMINGHAM_MIDSHIRES = 'bm',
  BLACK_HORSE = 'bh',
}

const themeMapper: Record<string, Theme> = {
  bos: bosTheme,
  bos2025: bos2025Theme,
  halifax: halifaxTheme,
  lloyds: lloydsTheme,
  lloyds2023: lloyds2023Theme,
  mbna: mbnaTheme,
  sw: scottishWidowsTheme,
  bm: birminghamMidshiresTheme,
  bh: blackHorseTheme,
};

export const getTheme = (brand?: Brand | string | null): Theme =>
  (brand ? themeMapper[brand] : undefined) ?? lloydsTheme;

const getThemeFromUrl = (): Brand | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme');

  const urlTheme = (Object.values(Brand) as Brand[]).find(
    (brandValue) => brandValue === theme,
  );

  return urlTheme;
};

function BrandProvider({
  children,
  brand,
}: {
  brand: Brand | null;
  children: React.ReactNode;
}): React.JSX.Element {
  const themeBrand = getThemeFromUrl() || brand || Brand.LLOYDS;
  const theme = getTheme(themeBrand);

  return (
    <>
      <GlobalStyle />
      <ConstellationBrandProvider theme={theme}>
        {children}
      </ConstellationBrandProvider>
    </>
  );
}

export default BrandProvider;
