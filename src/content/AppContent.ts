import { HeaderContent } from 'components/header/HeaderComponent.config';
import { NotFoundContent } from 'routes/notFound/NotFound.config';

import { HomePageContent } from 'routes/getPlanProgress/getPlanProgress.config';

export interface AppContent {
  homepage: HomePageContent;
  notfound: NotFoundContent;
  layoutContent: HeaderContent;
}
