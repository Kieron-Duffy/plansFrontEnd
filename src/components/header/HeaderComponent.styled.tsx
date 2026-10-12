import { themeContract } from '@constellation/themes/ve/contract';
import styled from 'styled-components';

import StyledNavLink from '../styledNavLink/StyledNavLink';

export const StyledLink = styled(StyledNavLink)<{ $brand?: string }>`
  padding-right: 10px;
  padding-bottom: 2px;
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  color: ${({ $brand }) =>
    $brand === 'sw' || $brand === 'lloyds'
      ? themeContract.link_color
      : `#fff !important`};
  transition: border-color 0.15s ease;

  &[aria-current='page'] {
    border-bottom-color: currentColor;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export const StyledHeader = styled.header`
  background-color: ${themeContract.header_color_background};
  margin-bottom: ${themeContract.spacing_05};
  padding: ${themeContract.spacing_05} 0;
`;
