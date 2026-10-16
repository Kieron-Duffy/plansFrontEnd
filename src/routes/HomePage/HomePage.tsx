import React, { ReactElement } from 'react';
import Footer from 'components/app/Footer';
import HomeJourneyHeader from 'components/app/homeJourneyHeader';
import StyledNavLink from 'components/styledNavLink/StyledNavLink';
import * as routes from '../manifest';

import './homePage.css';

function HomePageBlank(): ReactElement {
  return (
    <>
      <HomeJourneyHeader title="One step closer to your new home" />



      <Footer />
    </>
  );
}

export default HomePageBlank;
