import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CompleteTaskButton from './CompleteTaskButton';
import { completePlanTask } from '../../api/plans';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../brandProvider';

jest.mock('../../api/plans');

describe('CompleteTaskButton', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('disables the button while submitting and calls onCompleted after success', async () => {
    const user = userEvent.setup();
    const onCompleted = jest.fn();

    let resolveRequest!: () => void;
    jest.mocked(completePlanTask).mockReturnValue(
      new Promise<void>((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderWithTheme(
      <CompleteTaskButton taskId="task-123" onCompleted={onCompleted} />,
      { BRAND_NAME: Brand.LLOYDS },
    );

    await user.click(
      screen.getByRole('button', { name: 'Mark task complete' }),
    );

    expect(completePlanTask).toHaveBeenCalledTimes(1);
    expect(completePlanTask).toHaveBeenCalledWith('task-123');
    expect(
      screen.getByRole('button', { name: 'Completing task...' }),
    ).toBeDisabled();
    expect(onCompleted).not.toHaveBeenCalled();

    await act(async () => {
      resolveRequest();
    });

    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole('button', { name: 'Mark task complete' }),
    ).toBeEnabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error when completion fails and allows a retry', async () => {
    const user = userEvent.setup();
    const onCompleted = jest.fn();

    jest
      .mocked(completePlanTask)
      .mockRejectedValueOnce(new Error('Service unavailable'))
      .mockResolvedValueOnce(undefined);

    renderWithTheme(
      <CompleteTaskButton taskId="task-123" onCompleted={onCompleted} />,
      { BRAND_NAME: Brand.LLOYDS },
    );

    await user.click(
      screen.getByRole('button', { name: 'Mark task complete' }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Service unavailable',
    );
    expect(onCompleted).not.toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'Mark task complete' }),
    ).toBeEnabled();

    await user.click(
      screen.getByRole('button', { name: 'Mark task complete' }),
    );

    expect(completePlanTask).toHaveBeenCalledTimes(2);
    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('does not submit when disabled', async () => {
    const user = userEvent.setup();
    const onCompleted = jest.fn();

    renderWithTheme(
      <CompleteTaskButton
        taskId="task-123"
        onCompleted={onCompleted}
        disabled
      />,
      { BRAND_NAME: Brand.LLOYDS },
    );

    const button = screen.getByRole('button', {
      name: 'Mark task complete',
    });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(completePlanTask).not.toHaveBeenCalled();
    expect(onCompleted).not.toHaveBeenCalled();
  });

  it('shows a fallback message for a non-Error rejection', async () => {
    const user = userEvent.setup();
    const onCompleted = jest.fn();

    jest.mocked(completePlanTask).mockRejectedValueOnce(null);

    renderWithTheme(
      <CompleteTaskButton taskId="task-123" onCompleted={onCompleted} />,
      { BRAND_NAME: Brand.LLOYDS },
    );

    await user.click(
      screen.getByRole('button', { name: 'Mark task complete' }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to complete task.',
    );
    expect(onCompleted).not.toHaveBeenCalled();
  });
});
