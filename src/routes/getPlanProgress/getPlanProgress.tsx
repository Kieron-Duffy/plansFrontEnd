import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Paragraph } from '@constellation/core';
import Footer from 'components/app/Footer';
import HomeJourneyHeader from 'components/app/homeJourneyHeader';
import RightBoxes from 'components/app/RightBoxes';
import { deleteFtbPlan, getFtbPlanId, getPlanProgress } from '../../api/plans';
import type { PlanProgress } from '../../api/plans';
import ApiResultsBox from 'components/app/ApiResultsBox';
import CompleteTaskButton from 'components/app/CompleteTaskButton';

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
    description:
      'We will clearly communicate your progress and what you need to do next.',
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
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [planDeleted, setPlanDeleted] = useState(false);
  const deletionInFlight = useRef(false);

  async function handleRetrievePlan(): Promise<void> {
    if (isLoading || isDeleting) return;

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

  async function handleDeletePlan(): Promise<void> {
    if (!progress || deletionInFlight.current) return;

    deletionInFlight.current = true;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteFtbPlan(progress.planId);
      setProgress(null);
      setPlanDeleted(true);
      setError(null);
    } catch (error: unknown) {
      setDeleteError(
        error instanceof Error
          ? `Unable to delete your plan: ${error.message}`
          : 'Unable to delete your plan. Please try again.',
      );
    } finally {
      deletionInFlight.current = false;
      setIsDeleting(false);
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
              You don't currently have an active plan. You can create one on our
              home page.
            </Paragraph>
          )}
          {deleteError && <Paragraph role="alert">{deleteError}</Paragraph>}
          {planDeleted && (
            <Paragraph role="status">
              Your plan has been deleted. You can create a new one from the home
              page.
            </Paragraph>
          )}
          <ApiResultsBox progress={progress} />
        </div>

        <RightBoxes boxes={boxes} />
      </div>

      <div className="plan-progress-actions">
        <Button
          onClick={() => void handleRetrievePlan()}
          disabled={isLoading || isDeleting || planDeleted}
        >
          {isLoading ? 'Retrieving your plan...' : 'Retrieve Your Plan'}
        </Button>

        {progress?.nextTask && (
          <CompleteTaskButton
            taskId={progress.nextTask.taskId}
            onCompleted={() => void handleRetrievePlan()}
            disabled={isLoading || isDeleting}
          />
        )}

        {progress && (
          <Button
            onClick={() => void handleDeletePlan()}
            disabled={isLoading || isDeleting}
          >
            {isDeleting ? 'Deleting your plan...' : 'Delete plan'}
          </Button>
        )}
      </div>

      <div className="home-page-footer">
        <Footer />
      </div>
    </>
  );
}

export default HomePageBlank;
