import React, { ReactElement, useEffect, useState } from 'react';
import {
  Accordion,
  Button,
  ContentGroup,
  List,
  ListItem,
  Paragraph,
} from '@constellation/core';
import Footer from 'components/app/Footer';
import HomeJourneyHeader from 'components/app/homeJourneyHeader';
import RightBoxes from 'components/app/RightBoxes';
import { getFtbPlanId, getPlanProgress } from '../../api/plans';
import type { PlanProgress } from '../../api/plans';
import ApiResultsBox from 'components/app/ApiResultsBox';

import './getPlanProgress.css';

const boxes = [

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

];

function HomePageBlank(): ReactElement {
  const [progress, setProgress] = useState<PlanProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRetrievePlan(): Promise<void> {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const planId = await getFtbPlanId();
      const response = await getPlanProgress(planId);

      setProgress(response);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load plan progress.',
      );
    } finally {
      setIsLoading(false);
    }
  }

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
        <div className="apiResult-boxes-container">
          {error && (
            <Paragraph role="alert">
          You don't currently have an active plan.
             You can create one on our home page.
            </Paragraph>
          )}
          <ApiResultsBox progress={progress} />
        </div>

        <RightBoxes boxes={boxes} />
      </div>

      <Button
        onClick={() => {
          void handleRetrievePlan();
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Retrieving your plan...' : 'Retrieve Your Plan'}
      </Button>
      <Footer />
    </>
  );
}

export default HomePageBlank;