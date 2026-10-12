import { useContext } from 'react';

import AppConfig from './AppConfig';
import AppConfigContext from './AppConfigContext';

export default (): AppConfig => useContext(AppConfigContext);
