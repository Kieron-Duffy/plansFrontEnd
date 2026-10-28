import React from 'react';
import { screen } from '@testing-library/react';

import ApiResultsBox from './ApiResultsBox';
import type { PlanProgress } from '../../api/plans';
import { getTaskContent } from '../../content/task';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../brandProvider';

const progress: PlanProgress = {
  planId: 'plan-123',
  totalTasks: 4,
  completedTasks: 1,
  remainingTasks: 3,
  completionPercentage: 25,
  nextTask: {
    taskId: 'task-123',
    typeCode: 'FIRST_HOME_COST',
    categoryTypeCode: 'FIRST_HOME_COST',
    displayOrder: 1,
  },
};

describe('ApiResultsBox', () => {
  it('shows placeholders when no plan is available', () => {
    renderWithTheme(<ApiResultsBox progress={null} />, {
      BRAND_NAME: Brand.LLOYDS,
    });

    expect(
      screen.getByText(
        'Your next task will appear here when your plan is available.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your completed tasks will appear here.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your remaining tasks will appear here.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your progress will appear here.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('shows task guidance and current progress', () => {
    const taskContent = getTaskContent('FIRST_HOME_COST');

    if (!taskContent) {
      throw new Error('Expected FIRST_HOME_COST task content to exist');
    }

    renderWithTheme(<ApiResultsBox progress={progress} />, {
      BRAND_NAME: Brand.LLOYDS,
    });

    expect(
      screen.getByRole('heading', {
        name: `Next task: ${taskContent.title}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(taskContent.description)).toBeInTheDocument();
    expect(screen.getByText('1 of 4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('25% complete')).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar', {
      name: 'Plan completion',
    });

    expect(progressBar).toHaveAttribute('value', '25');
    expect(progressBar).toHaveAttribute('max', '100');
  });

  it('shows fallback guidance for an unrecognised task type', () => {
    renderWithTheme(
      <ApiResultsBox
        progress={{
          ...progress,
          nextTask: {
            taskId: 'task-unknown',
            typeCode: 'UNKNOWN_TASK',
            categoryTypeCode: 'UNKNOWN_TASK',
            displayOrder: 2,
          },
        }}
      />,
      { BRAND_NAME: Brand.LLOYDS },
    );

    expect(
      screen.getByRole('heading', { name: 'Next task' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Guidance for this task category is not yet available.'),
    ).toBeInTheDocument();
  });

  it('shows when there is no next task and preserves zero counts', () => {
    renderWithTheme(
      <ApiResultsBox
        progress={{
          ...progress,
          completedTasks: 4,
          remainingTasks: 0,
          completionPercentage: 100,
          nextTask: null,
        }}
      />,
      { BRAND_NAME: Brand.LLOYDS },
    );

    expect(screen.getByText('No next task available.')).toBeInTheDocument();
    expect(screen.getByText('4 of 4')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100% complete')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Plan completion' }),
    ).toHaveAttribute('value', '100');
  });
});
