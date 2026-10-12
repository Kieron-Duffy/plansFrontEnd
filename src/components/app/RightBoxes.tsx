import React, { ReactElement } from 'react';

import { Box, Heading, Paragraph } from '@constellation/core';

import './RightBoxes.css';

interface RightBoxContent {
  id: string;
  title: string;
  description: string;
}

interface RightBoxesProps {
  boxes: RightBoxContent[];
}

export default function RightBoxes({ boxes }: RightBoxesProps): ReactElement {
  return (
    <div className="right-boxes-container">
      <div className="right-boxes">
        {boxes.map(({ id, title, description }) => (
          <Box key={id}>
            <Heading as="h2">{title}</Heading>
            <Paragraph marginBottom="none">{description}</Paragraph>
          </Box>
        ))}
      </div>
    </div>
  );
}
