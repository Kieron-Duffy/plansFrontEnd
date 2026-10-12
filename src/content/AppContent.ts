import { HeaderContent } from 'components/header/HeaderComponent.config';
import { NotFoundContent } from 'routes/notFound/NotFound.config';

import { HomePageContent } from '../routes/homePage/HomePage.config';

export interface AppContent {
  homepage: HomePageContent;
  notfound: NotFoundContent;
  layoutContent: HeaderContent;
}
