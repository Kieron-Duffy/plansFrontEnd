import header from './header';
import homepage from './homepage';
import notfound from './notfound';
import { AppContent } from '../AppContent';

const content: AppContent = {
  homepage,
  notfound,
  layoutContent: { ...header },
};

export default content;
