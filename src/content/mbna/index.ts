import _base from '../_base';
import { AppContent } from '../AppContent';

_base.homepage = {
  brandName: 'mbna',
  ..._base.homepage,
};

const content: AppContent = {
  ..._base,
  ..._base.homepage,
};
export default content;
