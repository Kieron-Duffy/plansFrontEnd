import React from 'react';

import { Link } from '@constellation/core';
import { NavLink as RoutingNavLink } from '@interstellar/react-app-routing';

import { StyledLinkProps } from './StyledNavLink.types';

function StyledNavLink({
  children,
  ...rest
}: StyledLinkProps): React.JSX.Element {
  return (
    <Link as={RoutingNavLink} {...rest}>
      {children}
    </Link>
  );
}

export default StyledNavLink;
