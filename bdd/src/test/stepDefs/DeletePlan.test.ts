import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { apiFetch } from '../../../../src/api/client';
import { deleteFtbPlan } from '../../../../src/api/plans';
import type { DeleteFtbPlanResponse } from '../../../../src/api/plans';

jest.mock('../../../../src/api/client', () => ({
  apiFetch: jest.fn(),
}));

const feature = loadFeature(
  path.join(__dirname, '../resources/features/DeletePlan.feature'),
);

const mockedApiFetch = jest.mocked(apiFetch);
const plansPath = '/consumer-relationship/mass-affluent/future-plans/v2/plan';

type DeletionOutcome =
  | { status: 'succeeded'; response: DeleteFtbPlanResponse }
  | { status: 'failed'; error: unknown };

defineFeature(feature, (test) => {
  let outcome: DeletionOutcome | undefined;

  beforeEach(() => {
    mockedApiFetch.mockReset();
    outcome = undefined;
  });

  async function deletePlan(planId: string): Promise<void> {
    try {
      const response = await deleteFtbPlan(planId);
      outcome = { status: 'succeeded', response };
    } catch (error: unknown) {
      outcome = { status: 'failed', error };
    }
  }

  function expectPatchRequest(planId: string): void {
    expect(mockedApiFetch).toHaveBeenCalledTimes(1);
    expect(mockedApiFetch).toHaveBeenCalledWith(
      `${plansPath}/${encodeURIComponent(planId)}`,
      expect.objectContaining({
        method: 'PATCH',
      }),
    );
  }

  function expectPlanState(state: string): void {
    expect(mockedApiFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ state }),
      }),
    );
  }

  test('Delete a selected plan', ({ given, when, then, and }) => {
    given(
      /^the plan deletion request succeeds for plan "(.*)"$/,
      (_planId: string) => {
        const response: DeleteFtbPlanResponse = { state: 'DELETED' };
        mockedApiFetch.mockResolvedValue(response);
      },
    );

    when(/^the user deletes plan "(.*)"$/, deletePlan);

    then(/^a PATCH request is sent for plan "(.*)"$/, expectPatchRequest);

    and(/^the request changes the plan state to "(.*)"$/, expectPlanState);

    and('plan deletion succeeds', () => {
      expect(outcome).toEqual({
        status: 'succeeded',
        response: { state: 'DELETED' },
      });
    });
  });

  test('Handle a failed request to delete a plan', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^the plan deletion request fails with "(.*)"$/,
      (message: string) => {
        mockedApiFetch.mockRejectedValue(new Error(message));
      },
    );

    when(/^the user deletes plan "(.*)"$/, deletePlan);

    then(/^a PATCH request is sent for plan "(.*)"$/, expectPatchRequest);

    and(/^the request changes the plan state to "(.*)"$/, expectPlanState);

    and(/^plan deletion fails with "(.*)"$/, (message: string) => {
      expect(outcome).toEqual({
        status: 'failed',
        error: new Error(message),
      });
    });
  });
});
