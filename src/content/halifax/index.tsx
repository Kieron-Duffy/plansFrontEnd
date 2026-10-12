import _base from '../_base';
import { AppContent } from '../AppContent';

_base.homepage = {
  brandName: 'Halifax',
  ..._base.homepage,
};

const content: AppContent = {
  ..._base,
  ..._base.homepage,
};

export default content;
