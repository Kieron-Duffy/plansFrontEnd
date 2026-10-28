import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Page from './getPlanProgress';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../../components/brandProvider';
import homePage from '../../content/_base/homepage';
import { completePlanTask, getFtbPlanId, getPlanProgress,
} from '../../api/plans';
import type { PlanProgress } from '../../api/plans';

jest.mock('../../api/plans');

jest.mock('@interstellar/react-app-content', () => ({
  useContent: jest.fn(() => ({ ...homePage })),
}));

const progress: PlanProgress = {
  planId: 'plan-123',
  totalTasks: 4,
  completedTasks: 1,
  remainingTasks: 3,
  completionPercentage: 25,
  nextTask: null,
};

describe('Plan progress page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(getFtbPlanId).mockResolvedValue(progress.planId);
    jest.mocked(getPlanProgress).mockResolvedValue(progress);
  });

  it('loads and renders the current plan progress', async () => {
    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(
      screen.getByRole('heading', {
        name: 'One step closer to your new home',
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText('25% complete')).toBeInTheDocument();
    expect(screen.getByText('1 of 4')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Plan completion' }),
    ).toHaveAttribute('value', '25');
    expect(getFtbPlanId).toHaveBeenCalledTimes(1);
    expect(getPlanProgress).toHaveBeenCalledWith(progress.planId);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an alert when there is no active plan', async () => {
    jest.mocked(getFtbPlanId).mockRejectedValue(new Error('404 Not Found'));

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "You don't currently have an active plan.",
    );
    expect(getPlanProgress).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('button', { name: 'Delete plan' }),
    ).not.toBeInTheDocument();
  });

  it('shows an alert when loading plan progress fails', async () => {
    jest.mocked(getPlanProgress).mockRejectedValue(
      new Error('500 Internal Server Error'),
    );

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      "You don't currently have an active plan.",
    );
    expect(getPlanProgress).toHaveBeenCalledWith(progress.planId);
  });

  it('refreshes progress after completing a task and completes the next task', async () => {
    const user = userEvent.setup();

    const initialProgress: PlanProgress = {
      ...progress,
      nextTask: {
        taskId: 'task-1',
        typeCode: 'FIRST_HOME_COST',
        categoryTypeCode: 'FIRST_HOME_COST',
        displayOrder: 1,
      },
    };

    const updatedProgress: PlanProgress = {
      ...progress,
      completedTasks: 2,
      remainingTasks: 2,
      completionPercentage: 50,
      nextTask: {
        taskId: 'task-2',
        typeCode: 'STAMP_DUTY',
        categoryTypeCode: 'STAMP_DUTY',
        displayOrder: 2,
      },
    };

    const finalProgress: PlanProgress = {
      ...progress,
      completedTasks: 4,
      remainingTasks: 0,
      completionPercentage: 100,
      nextTask: null,
    };

    jest
      .mocked(getPlanProgress)
      .mockResolvedValueOnce(initialProgress)
      .mockResolvedValueOnce(updatedProgress)
      .mockResolvedValueOnce(finalProgress);
    jest.mocked(completePlanTask).mockResolvedValue(undefined);

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(
      await screen.findByRole('heading', {
        name: 'Next task: Understand the costs of buying your first home',
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Mark task complete' }),
    );

    expect(await screen.findByText('50% complete')).toBeInTheDocument();
    expect(screen.getByText('2 of 4')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Next task: Check your property tax costs',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Plan completion' }),
    ).toHaveAttribute('value', '50');

    expect(completePlanTask).toHaveBeenNthCalledWith(1, 'task-1');
    expect(getPlanProgress).toHaveBeenNthCalledWith(2, progress.planId);

    await user.click(
      screen.getByRole('button', { name: 'Mark task complete' }),
    );

    expect(await screen.findByText('100% complete')).toBeInTheDocument();
    expect(completePlanTask).toHaveBeenNthCalledWith(2, 'task-2');
    expect(getPlanProgress).toHaveBeenNthCalledWith(3, progress.planId);
    expect(screen.getByText('No next task available.')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Mark task complete' }),
    ).not.toBeInTheDocument();
  });
});
