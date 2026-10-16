import React, { ReactElement, useRef, useState } from 'react';
import {
  Button,
  Paragraph,
  RadioButton,
  RadioButtonGroup,
} from '@constellation/core';
import Footer from 'components/app/Footer';
import HomeJourneyHeader from 'components/app/homeJourneyHeader';
import { createFtbPlan } from '../../api/plans';
import type { CreateFtbPlanResponse, FtbCohort } from '../../api/plans';

import './homePage.css';

const cohortOptions: { value: FtbCohort; label: string }[] = [
  {
    value: 'ASPIRATIONAL',
    label: "I'm Aspiring to be a First Time Buyer",
  },
  {
    value: 'PROSPECTIVE',
    label: 'I have saved some money and want to buy a home',
  },
  {
    value: 'CUSP',
    label: 'I have a deposit and have a lot of knowledge about buying a home',
  },
];

function HomePageBlank(): ReactElement {
  const [cohort, setCohort] = useState<FtbCohort | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPlan, setCreatedPlan] = useState<CreateFtbPlanResponse | null>(
    null,
  );
  const submissionInFlight = useRef(false);

  async function handleSubmit(): Promise<void> {
    if (submissionInFlight.current || createdPlan) return;

    if (!cohort) {
      setError('Select where you are on your home buying journey.');
      return;
    }

    submissionInFlight.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createFtbPlan(cohort);
      setCreatedPlan(response);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? `Unable to create your plan: ${error.message}`
          : 'Unable to create your plan. Please try again.',
      );
    } finally {
      submissionInFlight.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <HomeJourneyHeader title="Let's put a plan into action" />

      <div className="home-page-content">
        <div className="home-page-hero-container">
          <img src="/door-mobile-hero-ftb.jpg" alt="" />
        </div>

        <form
          className="home-page-options"
          aria-busy={isSubmitting}
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <RadioButtonGroup
            label="Where are you on your home buying journey?"
            name="cohort"
            disabled={isSubmitting || createdPlan !== null}
          >
            {cohortOptions.map((option) => (
              <RadioButton
                key={option.value}
                id={`cohort-${option.value.toLowerCase()}`}
                name="cohort"
                value={option.value}
                checked={cohort === option.value}
                onChange={() => {
                  setCohort(option.value);
                  setError(null);
                }}
              >
                {option.label}
              </RadioButton>
            ))}
          </RadioButtonGroup>

          {error && <Paragraph role="alert">{error}</Paragraph>}

          <Button type="submit" disabled={isSubmitting || createdPlan !== null}>
            {isSubmitting ? 'Creating your plan...' : 'Create plan'}
          </Button>

          {createdPlan && (
            <Paragraph role="status">
              Your {createdPlan.plan.name} plan has been created.
            </Paragraph>
          )}
        </form>
      </div>

      <div className="home-page-footer">
        <Footer />
      </div>
    </>
  );
}

export default HomePageBlank;
