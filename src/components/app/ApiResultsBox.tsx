import React, { ReactElement } from 'react';
import { Heading, Paragraph, SummaryBox } from '@constellation/core';

import type { PlanProgress } from '../../api/plans';

import './RightBoxes.css';
import { getTaskContent } from 'content/task';
import PlanProgressBar from 'components/app/PlanProgressBar';

interface ApiResultsBoxProps {
  progress: PlanProgress | null;
}

export default function ApiResultsBox({
  progress,
}: ApiResultsBoxProps): ReactElement {
  const nextTaskContent = progress?.nextTask
    ? getTaskContent(progress.nextTask.typeCode)
    : undefined;

  const boxes = [
    {
      id: 'next-task',
      title: nextTaskContent
        ? `Next task: ${nextTaskContent.title}`
        : 'Next task',
      description: !progress
        ? 'Your next task will appear here when your plan is available.'
        : progress.nextTask
          ? (nextTaskContent?.description ??
            'Guidance for this task category is not yet available.')
          : 'No next task available.',
    },
    {
      id: 'completed',
      title: 'Tasks completed',
      description: progress
        ? `${progress.completedTasks} of ${progress.totalTasks}`
        : 'Your completed tasks will appear here.',
    },
    {
      id: 'remaining',
      title: 'Tasks remaining',
      description: progress
        ? `${progress.remainingTasks}`
        : 'Your remaining tasks will appear here.',
    },
    {
      id: 'percentage',
      title: 'Plan progress',
      description: progress
        ? `${progress.completionPercentage}% complete`
        : 'Your progress will appear here.',
    },
  ];



  return (
    <div className="apiResult-boxes-container">
      <div className="apiResult-boxes">
        {boxes.map(({ id, title, description }) => (
          <SummaryBox key={id} variation="secondary">
            <Heading as="h2">{title}</Heading>
            {id === 'percentage' && progress ? (
              <PlanProgressBar percentage={progress.completionPercentage} />
            ) : (
              <Paragraph marginBottom="none">{description}</Paragraph>
            )}
          </SummaryBox>
        ))}
      </div>
    </div>
  );
}