import { Content } from '@interstellar/react-app-content';

export interface NotFoundContent extends Content {
  heading?: string;
  subHeading?: string;
  footer?: string;
  footerLink?: string;
  subFooter?: string;
}
