// src/components/homeJourneyHeader/HomeJourneyHeader.tsx
import React, { ReactElement } from 'react';
import { Heading, JourneyHeader, Text } from '@constellation/core';

interface HomeJourneyHeaderProps {

  title: string;
}

export default function HomeJourneyHeader({
  title,
}: HomeJourneyHeaderProps): ReactElement {
  return (
    <JourneyHeader>
      <Heading as="h1" size="s7">
        {title}
      </Heading>
    </JourneyHeader>
  );
}
