import { themeContract } from '@constellation/themes/ve/contract';
import styled from 'styled-components';

const NavLinks = styled('div')(
  () => `
  display: flex;
  justify-content: flex-end;
  > a:not(:last-child){margin-right: ${themeContract.spacing_05}};
  white-space: nowrap;
`,
);

export default NavLinks;
