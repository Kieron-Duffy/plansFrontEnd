import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { apiFetch } from '../../../../src/api/client';
import { completePlanTask } from '../../../../src/api/plans';

jest.mock('../../../../src/api/client', () => ({
  apiFetch: jest.fn(),
}));

const feature = loadFeature(
  path.join(__dirname, '../resources/features/PatchTask.feature'),
);

const mockedApiFetch = jest.mocked(apiFetch);
const plansPath = '/consumer-relationship/mass-affluent/future-plans/v2/plan';

type CompletionOutcome =
  { status: 'succeeded' } | { status: 'failed'; error: unknown };

defineFeature(feature, (test) => {
  let outcome: CompletionOutcome | undefined;

  beforeEach(() => {
    mockedApiFetch.mockReset();
    outcome = undefined;
  });

  async function completeTask(taskId: string): Promise<void> {
    try {
      await completePlanTask(taskId);
      outcome = { status: 'succeeded' };
    } catch (error: unknown) {
      outcome = { status: 'failed', error };
    }
  }

  function expectPatchRequest(encodedTaskId: string): void {
    expect(mockedApiFetch).toHaveBeenCalledTimes(1);
    expect(mockedApiFetch).toHaveBeenCalledWith(
      `${plansPath}/task/${encodedTaskId}`,
      expect.objectContaining({
        method: 'PATCH',
      }),
    );
  }

  function expectTaskState(state: string): void {
    expect(mockedApiFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ state }),
      }),
    );
  }

  test('Complete a selected task', ({ given, when, then, and }) => {
    given('the task completion request succeeds', () => {
      mockedApiFetch.mockResolvedValue(undefined);
    });

    when(/^the user completes task "(.*)"$/, completeTask);

    then(/^a PATCH request is sent for task "(.*)"$/, expectPatchRequest);

    and(/^the request changes the task state to "(.*)"$/, expectTaskState);

    and('task completion succeeds', () => {
      expect(outcome).toEqual({ status: 'succeeded' });
    });
  });

  test('Handle a failed task completion request', ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^the task completion request fails with "(.*)"$/,
      (message: string) => {
        mockedApiFetch.mockRejectedValue(new Error(message));
      },
    );

    when(/^the user completes task "(.*)"$/, completeTask);

    then(/^a PATCH request is sent for task "(.*)"$/, expectPatchRequest);

    and(/^the request changes the task state to "(.*)"$/, expectTaskState);

    and(/^task completion fails with "(.*)"$/, (message: string) => {
      expect(outcome).toEqual({
        status: 'failed',
        error: new Error(message),
      });
    });
  });
});
