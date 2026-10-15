import React, { ReactElement } from 'react';
import { Heading, Paragraph, SummaryBox } from '@constellation/core';

import type { PlanProgress } from '../../api/plans';

import './RightBoxes.css';
import { getTaskContent } from 'content/task';

interface ApiResultsBoxProps {
  progress: PlanProgress;
}

export default function ApiResultsBox({
                                        progress,
                                      }: ApiResultsBoxProps): ReactElement {

  const nextTaskContent = progress.nextTask
    ? getTaskContent(progress.nextTask.categoryTypeCode)
    : undefined;

  const boxes = [
    {
      id: 'next-task',
      title: nextTaskContent
        ? `Next task: ${nextTaskContent.title}`
        : 'Next task',
      description: progress.nextTask
        ? (nextTaskContent?.description ??
          'Guidance for this task category is not yet available.')
        : 'No next task available.',
    },
    {
      id: 'completed',
      title: 'Tasks completed',
      description: `${progress.completedTasks} of ${progress.totalTasks}`,
    },
    {
      id: 'remaining',
      title: 'Tasks remaining',
      description: `${progress.remainingTasks}`,
    },
    {
      id: 'percentage',
      title: 'Plan progress',
      description: `${progress.completionPercentage}% complete`,
    },
  ];

  return (
    <div className="apiResult-boxes-container">
      <div className="apiResult-boxes">
        {boxes.map(({ id, title, description }) => (
          <SummaryBox key={id} variation="secondary">
            <Heading as="h2">{title}</Heading>
            <Paragraph marginBottom="none">{description}</Paragraph>
          </SummaryBox>




        ))}
      </div>
    </div>
  );
}