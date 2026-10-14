import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Paragraph } from '@constellation/core';
import Footer from 'components/app/Footer';
import HomeJourneyHeader from 'components/app/homeJourneyHeader';
import RightBoxes from 'components/app/RightBoxes';
import { getFtbPlanId, getPlanProgress } from '../../api/plans';
import type { PlanProgress } from '../../api/plans';
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

function HomePageBlank(): ReactElement {
  const [progress, setProgress] = useState<PlanProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProgress(): Promise<void> {
      try {
        const planId = await getFtbPlanId();
        const response = await getPlanProgress(planId);

        if (active) {
          setProgress(response);
        }
      } catch (error: unknown) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : 'Unable to load plan progress.',
          );
        }
      }
    }

    void loadProgress();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <HomeJourneyHeader title="One step closer to your new home" />

      <div className="boxes-row">
        {error ? (
          <Paragraph>Error: {error}</Paragraph>
        ) : progress ? (
          <ApiResultsBox progress={progress} />
        ) : (
          <Paragraph>Loading...</Paragraph>
        )}

        <RightBoxes boxes={boxes} />
      </div>

      <Button>Apply now</Button>
      <Footer />
    </>
  );
}

export default HomePageBlank;