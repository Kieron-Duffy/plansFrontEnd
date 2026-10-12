import { Brand } from 'components/brandProvider';

import { AppContent } from './AppContent';
import blackHorseContent from './bh';
import birminghamMidshiresContent from './bm';
import bosContent from './bos';
import bos2025Content from './bos2025';
import halifaxContent from './halifax';
import lloydsContent from './lloyds';
import mbnaContent from './mbna';
import scottishWidowsContent from './sw';

interface AppContentResolverContext {
  brand: Brand;
}

export default ({ brand }: AppContentResolverContext): AppContent => {
  switch (brand) {
    case Brand.LLOYDS:
      return lloydsContent;

    case Brand.HALIFAX:
      return halifaxContent;

    case Brand.BOS:
      return bosContent;

    case Brand.BOS_2025:
      return bos2025Content;

    case Brand.MBNA:
      return mbnaContent;

    case Brand.SCOTTISH_WIDOWS:
      return scottishWidowsContent;

    case Brand.BIRMINGHAM_MIDSHIRES:
      return birminghamMidshiresContent;

    case Brand.BLACK_HORSE:
      return blackHorseContent;

    default:
      return lloydsContent;
  }
};
