import React, { ReactElement } from 'react';

import { Button } from '@constellation/core';
import Footer from 'components/app/Footer';
import HomeJourneyHeader from 'components/app/homeJourneyHeader';
import RightBoxes from 'components/app/RightBoxes';
import PlanProgressPanel from 'components/app/PlansProgressPanel';
import ApiResultsBox from 'components/app/ApiResultsBox';

import './homePage.css';

const boxes = [
  {
    id: 'internet-banking',
    title: 'Internet Banking at your fingertips',
    description:
      'Managing your money ',
  },
  {
    id: 'box-2',
    title: 'Your second heading',
    description: 'Your second box text.',
  },
  {
    id: 'box-3',
    title: 'Your third heading',
    description: 'Your third box text.',
  },
  {
    id: 'box-4',
    title: 'Your fourth heading',
    description: 'Your fourth box text.',
  },
  {
    id: 'box-5',
    title: 'Your fifth heading',
    description: 'Your fifth box text.',
  },
];

const apiResultsBoxes = [
  {
    id: 'internet-banking',
    title: 'Internet Banking at your fingertips',
    description: 'Managing your money ',
  },
  {
    id: 'box-2',
    title: 'Your second heading',
    description: 'Your second box text.',
  },

];

function HomePageBlank(): ReactElement {
  return (
    <>
      <HomeJourneyHeader title="One step closer to your new home" />

      <div className="boxes-row">
        <ApiResultsBox boxes={apiResultsBoxes} />
        <RightBoxes boxes={boxes} />
      </div>
      <PlanProgressPanel />
      <Button>Apply now</Button>

      <Footer />
    </>
  );
}

export default HomePageBlank;
