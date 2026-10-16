import React, { ReactElement } from 'react';
import { Paragraph } from '@constellation/core';

import './PlanProgressBar.css';

interface PlanProgressBarProps {
  percentage: number;
}

export default function PlanProgressBar({
  percentage,
}: PlanProgressBarProps): ReactElement {
  return (
    <div className="plan-progress">
      <Paragraph marginBottom="none">{percentage}% complete</Paragraph>
      <progress
        className="plan-progress-bar"
        value={percentage}
        max={100}
        aria-label="Plan completion"
      >
        {percentage}%
      </progress>
    </div>
  );
}
