import { ComponentProps } from 'react';

import { Link } from '@constellation/core';
import { NavLinkProps } from '@interstellar/react-app-routing';

export type StyledLinkProps = ComponentProps<typeof Link> &
  Pick<NavLinkProps, 'to'>;
