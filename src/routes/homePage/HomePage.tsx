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
    description: 'Managing your money ',
  },
  {
    id: 'box-2',
    title: 'Your Plan Adapts to You',
    description:
      'As your plan progresses, the tasks you need to complete will change.',
  },
  {
    id: 'box-3',
    title: 'We track your progress',
    description: 'We will clearly communicate your progress and what you need to do next.',
  },
  {
    id: 'box-4',
    title: 'Plans change as you get closer to your goal',
    description: 'We have tailored plans based on your progress',
  },
  {
    id: 'box-5',
    title: 'Detailed information about your plan',
    description: 'Each task has detailed information to help you complete it successfully.',
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

      <Button>Retrieve Your Plan</Button>
      <Footer />
    </>
  );
}

export default HomePageBlank;