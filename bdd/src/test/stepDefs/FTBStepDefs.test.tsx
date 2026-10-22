import React from 'react';
import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createFtbPlan } from '../../../../src/api/plans';
import type {
  CreateFtbPlanResponse,
  FtbCohort,
} from '../../../../src/api/plans';
import { Brand } from '../../../../src/components/brandProvider';
import renderWithTheme from '../../../../src/__tests__/__utils__/renderWithTheme';
import HomePage from '../../../../src/routes/HomePage/HomePage';

jest.mock('../../../../src/api/plans', () => ({
  createFtbPlan: jest.fn(),
}));

const feature = loadFeature(
  path.join(__dirname, '../resources/features/CreateFtbPlan.feature'),
);
const mockedCreateFtbPlan = jest.mocked(createFtbPlan);

defineFeature(feature, (test) => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    mockedCreateFtbPlan.mockReset();
  });

  test('Create a plan for a selected cohort', ({ given, when, then, and }) => {
    given('the home page is open', () => {
      user = userEvent.setup();
      renderWithTheme(<HomePage />, { BRAND_NAME: Brand.LLOYDS });
    });

    and(
      /^the plan creation request succeeds with name "(.*)"$/,
      (planName: string) => {
        const response: CreateFtbPlanResponse = {
          partyConfig: { ftbCohort: 'PROSPECTIVE' },
          plan: { id: 'plan-123', name: planName },
        };
        mockedCreateFtbPlan.mockResolvedValue(response);
      },
    );

    when(
      /^the user selects the cohort "(.*)"$/,
      async (cohortLabel: string) => {
        await user.click(screen.getByRole('radio', { name: cohortLabel }));
      },
    );

    when('the user submits the plan form', async () => {
      await user.click(screen.getByRole('button', { name: 'Create plan' }));
    });

    then(
      /^the create plan API is called with cohort "(.*)"$/,
      (cohort: FtbCohort) => {
        expect(mockedCreateFtbPlan).toHaveBeenCalledWith(cohort);
      },
    );

    and(/^a success message is shown for "(.*)"$/, async (planName: string) => {
      expect(await screen.findByRole('status')).toHaveTextContent(
        `Your ${planName} plan has been created.`,
      );
    });
  });

  test('Require the user to select a cohort', ({ given, when, then, and }) => {
    given('the home page is open', () => {
      user = userEvent.setup();
      renderWithTheme(<HomePage />, { BRAND_NAME: Brand.LLOYDS });
    });

    when('the user submits the plan form', async () => {
      await user.click(screen.getByRole('button', { name: 'Create plan' }));
    });

    then('a cohort selection error is shown', async () => {
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Select where you are on your home buying journey.',
      );
    });

    and('the create plan API is not called', () => {
      expect(mockedCreateFtbPlan).not.toHaveBeenCalled();
    });
  });

  test('Show an error when plan creation fails', ({
    given,
    when,
    then,
    and,
  }) => {
    given('the home page is open', () => {
      user = userEvent.setup();
      renderWithTheme(<HomePage />, { BRAND_NAME: Brand.LLOYDS });
    });

    and(/^the plan creation request fails with "(.*)"$/, (message: string) => {
      mockedCreateFtbPlan.mockRejectedValue(new Error(message));
    });

    when(
      /^the user selects the cohort "(.*)"$/,
      async (cohortLabel: string) => {
        await user.click(screen.getByRole('radio', { name: cohortLabel }));
      },
    );

    when('the user submits the plan form', async () => {
      await user.click(screen.getByRole('button', { name: 'Create plan' }));
    });

    then(
      /^the create plan API is called with cohort "(.*)"$/,
      (cohort: FtbCohort) => {
        expect(mockedCreateFtbPlan).toHaveBeenCalledWith(cohort);
      },
    );

    and(
      /^a plan creation error is shown for "(.*)"$/,
      async (message: string) => {
        expect(await screen.findByRole('alert')).toHaveTextContent(
          `Unable to create your plan: ${message}`,
        );
      },
    );
  });
});
