import React, { ComponentProps, ReactElement } from 'react';

import {
  BackgroundProvider,
  Container,
  Grid,
  GridItem,
  pxToRem,
  useBrand,
  useWindowSize,
} from '@constellation/core';
import { useContent } from '@interstellar/react-app-content';
import { NavLink } from '@interstellar/react-app-routing';

import { HeaderContent } from './HeaderComponent.config';
import { StyledHeader, StyledLink } from './HeaderComponent.styled';
import StyledNavLinks from './NavLinks.styled';
import * as routes from '../../routes/manifest';
import { Brand, getTheme } from '../brandProvider/BrandProvider';

function Logo() {
  const theme = getTheme(useBrand()?.brand as Brand | undefined);
  const { width: windowWidth } = useWindowSize();
  const isNarrow = pxToRem(windowWidth) < parseFloat(theme.breakpoint_lg);
  const isWide = !isNarrow;
  const logo = theme.assets?.logo;

  if (logo) {
    if (isWide && logo.wide) {
      return React.createElement(logo.wide, {
        style: {
          height: theme.header_logo_height_big,
          width: theme.header_logo_width_big,
        },
      });
    }
    if (logo.base) {
      return React.createElement(logo.base, {
        style: {
          height: theme.header_logo_height,
          width: theme.header_logo_width,
        },
      });
    }
  }
  return null;
}

export default function HeaderComponent(
  props: ComponentProps<'header'>,
): ReactElement {
  const theme = getTheme(useBrand()?.brand as Brand | undefined);
  const brand = theme.brand;
  const { homeLink } = useContent<HeaderContent>();

  return (
    <StyledHeader data-qa-id={(props as Record<string, any>)['data-qa-id']}>
      <BackgroundProvider value={{ cssValue: theme.header_color_background }}>
        <Container>
          <Grid alignY="center">
            <GridItem xs={4}>
              <NavLink to={routes.Home} title="logo">
                <Logo />
              </NavLink>
            </GridItem>
            <GridItem xs={6} />
            <GridItem xs={2}>
              <StyledNavLinks>
                <StyledLink $brand={brand} to={routes.Home}>
                  {homeLink}
                </StyledLink>

                <StyledLink $brand={brand} to={routes.GetPlanProgress}>
                  Plan Progress
                </StyledLink>
              </StyledNavLinks>


            </GridItem>
          </Grid>
        </Container>
      </BackgroundProvider>
    </StyledHeader>
  );
}
