import React, { ReactElement } from 'react';

import { ContentGroup, Grid, GridItem } from '@constellation/core';
import { useContent } from '@interstellar/react-app-content';

import { NotFoundContent } from './NotFound.config';
import { StyledParagraph, StyledLink, StyledHeading } from './NotFound.styled';
import * as routes from '../manifest';

function NotFound(): ReactElement {
  const { heading, subHeading, footer, footerLink, subFooter } =
    useContent<NotFoundContent>();

  return (
    <ContentGroup >
      <Grid >
        <GridItem xs={5} />
        <GridItem xs={12}>
          <StyledHeading>{heading}</StyledHeading>
        </GridItem>
      </Grid>
      <Grid >
        <GridItem xs={12}>
          <StyledParagraph>{subHeading}</StyledParagraph>
        </GridItem>
      </Grid>
      <Grid >
        <GridItem xs={12}>
          <StyledParagraph>
            {footer}{' '}
            <StyledLink
              href={routes.Home}
              
            >
              {footerLink}
            </StyledLink>
            {subFooter}
          </StyledParagraph>
        </GridItem>
      </Grid>
    </ContentGroup>
  );
}

export default NotFound;
