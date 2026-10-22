import React, { useState } from 'react';
import { Button, Paragraph } from '@constellation/core';
import { completePlanTask } from '../../api/plans';

interface CompleteTaskButtonProps {
  taskId: string;
  onCompleted: () => void;
  disabled?: boolean;
}

export default function CompleteTaskButton({
  taskId,
  onCompleted,
  disabled = false,
}: CompleteTaskButtonProps): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleComplete(): Promise<void> {
    setIsSubmitting(true);
    setError(null);

    try {
      await completePlanTask(taskId);
      onCompleted();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error ? cause.message : 'Unable to complete task.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => void handleComplete()}
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? 'Completing task...' : 'Mark task complete'}
      </Button>
      {error && <Paragraph role="alert">{error}</Paragraph>}
    </>
  );
}
