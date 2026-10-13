import React, { ReactElement } from 'react';

import { Box, Heading, Paragraph, SummaryBox } from '@constellation/core';

import './RightBoxes.css';

interface RightBoxContent {
  id: string;
  title: string;
  description: string;
}

interface RightBoxesProps {
  boxes: RightBoxContent[];
}

export default function ApiResultsBox({
  boxes,
}: RightBoxesProps): ReactElement {
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
