import React, { ReactElement, useEffect, useState } from 'react';

import { Heading, Paragraph } from '@constellation/core';

import { getFtbPlanId, getPlanProgress, PlanProgress } from '../../api/plans';

export default function PlanProgressPanel(): ReactElement {
  const [progress, setProgress] = useState<PlanProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const planId = await getFtbPlanId();
        const res = await getPlanProgress(planId);
        if (active) setProgress(res);
      } catch (e) {
        if (active) setError((e as Error).message);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (error) return <Paragraph>Error: {error}</Paragraph>;
  if (!progress) return <Paragraph>Loading…</Paragraph>;

  return (
    <>
      <Heading as="h2">Progress</Heading>
      <pre>{JSON.stringify(progress, null, 2)}</pre>
    </>
  );
}
