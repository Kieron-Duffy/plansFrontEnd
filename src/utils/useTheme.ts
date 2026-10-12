import { useBrand } from '@constellation/core';
import { type Theme } from '@constellation/themes';

import { getTheme } from '../components/brandProvider/BrandProvider';

/**
 * Custom hook that reads the current brand from Constellation's BrandContext
 * and returns the matching Theme object.
 * Falls back to lloydsTheme when used outside a BrandProvider.
 */
export function useTheme(): Theme {
  const brandCtx = useBrand();
  return getTheme(brandCtx?.brand);
}
