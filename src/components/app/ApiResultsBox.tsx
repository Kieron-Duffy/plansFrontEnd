import React, { ReactElement } from 'react';
import { Heading, Paragraph, SummaryBox } from '@constellation/core';

import type { PlanProgress } from '../../api/plans';

import './RightBoxes.css';

interface ApiResultsBoxProps {
  progress: PlanProgress;
}

export default function ApiResultsBox({
                                        progress,
                                      }: ApiResultsBoxProps): ReactElement {
  const boxes = [
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

    {
      id: 'next-task',
      title: 'Next task',
      description: progress.nextTask
        ? `Type: ${progress.nextTask.typeCode}, 
        Category: ${progress.nextTask.categoryTypeCode}`
        : 'No next task available.',
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