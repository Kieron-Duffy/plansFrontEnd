import React from 'react';

import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Page from './HomePage';
import renderWithTheme from '../../__tests__/__utils__/renderWithTheme';
import { Brand } from '../../components/brandProvider';
import homePage from '../../content/_base/homepage';
import { createFtbPlan } from '../../api/plans';
import type { CreateFtbPlanResponse } from '../../api/plans';

jest.mock('../../api/plans');

jest.mock('@interstellar/react-app-content', () => ({
  useContent: jest.fn(() => ({ ...homePage })),
}));

const createdPlan: CreateFtbPlanResponse = {
  partyConfig: { ftbCohort: 'PROSPECTIVE' },
  plan: { id: 'plan-123', name: 'First Time Buyer' },
};

const prospectiveLabel = 'I have saved some money and want to buy a home';

describe('Page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the home buying plan form', () => {
    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(
      screen.getByRole('heading', { name: "Let's put a plan into action" }),
    ).toBeInTheDocument();
  });

  it('starts with no cohort selected and the submit button enabled', () => {
    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    expect(screen.getAllByRole('radio')).toHaveLength(3);
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).not.toBeChecked();
    });
    expect(screen.getByRole('button', { name: 'Create plan' })).toBeEnabled();
  });

  it('selects only one cohort at a time', async () => {
    const user = userEvent.setup();

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    const aspirational = screen.getByRole('radio', {
      name: "I'm Aspiring to be a First Time Buyer",
    });
    const prospective = screen.getByRole('radio', { name: prospectiveLabel });

    await user.click(aspirational);
    expect(aspirational).toBeChecked();

    await user.click(prospective);
    expect(prospective).toBeChecked();
    expect(aspirational).not.toBeChecked();
  });

  it('asks for a selection and does not call the API when none is made', async () => {
    const user = userEvent.setup();

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    await user.click(screen.getByRole('button', { name: 'Create plan' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Select where you are on your home buying journey.',
    );
    expect(createFtbPlan).not.toHaveBeenCalled();
  });

  it('clears the validation error once a cohort is selected', async () => {
    const user = userEvent.setup();

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    await user.click(screen.getByRole('button', { name: 'Create plan' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: prospectiveLabel }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('submits the selected cohort and locks the form after creation', async () => {
    const user = userEvent.setup();
    let resolveRequest!: (value: CreateFtbPlanResponse) => void;

    jest.mocked(createFtbPlan).mockReturnValue(
      new Promise<CreateFtbPlanResponse>((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    await user.click(screen.getByRole('radio', { name: prospectiveLabel }));
    await user.click(screen.getByRole('button', { name: 'Create plan' }));

    expect(createFtbPlan).toHaveBeenCalledTimes(1);
    expect(createFtbPlan).toHaveBeenCalledWith('PROSPECTIVE');
    expect(
      screen.getByRole('button', { name: 'Creating your plan...' }),
    ).toBeDisabled();
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });

    await act(async () => {
      resolveRequest(createdPlan);
    });

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Your First Time Buyer plan has been created.',
    );
    expect(screen.getByRole('button', { name: 'Create plan' })).toBeDisabled();
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('shows an error when plan creation fails and allows a retry', async () => {
    const user = userEvent.setup();

    jest
      .mocked(createFtbPlan)
      .mockRejectedValueOnce(new Error('500 Internal Server Error'))
      .mockResolvedValueOnce(createdPlan);

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    await user.click(screen.getByRole('radio', { name: prospectiveLabel }));
    await user.click(screen.getByRole('button', { name: 'Create plan' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to create your plan: 500 Internal Server Error',
    );
    expect(screen.getByRole('button', { name: 'Create plan' })).toBeEnabled();
    expect(screen.getByRole('radio', { name: prospectiveLabel })).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Create plan' }));

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(createFtbPlan).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows a fallback message for a non-Error rejection', async () => {
    const user = userEvent.setup();

    jest.mocked(createFtbPlan).mockRejectedValueOnce(null);

    renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

    await user.click(screen.getByRole('radio', { name: prospectiveLabel }));
    await user.click(screen.getByRole('button', { name: 'Create plan' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to create your plan. Please try again.',
    );
  });
  it.each([
    [
      "I'm Aspiring to be a First Time Buyer",
      'ASPIRATIONAL',
      'Aspirational Plan',
    ],
    [prospectiveLabel, 'PROSPECTIVE', 'Prospective Plan'],
    [
      'I have a deposit and have a lot of knowledge about buying a home',
      'CUSP',
      'Cusp Plan',
    ],
  ] as const)(
    'submits "%s" as %s and shows the returned plan',
    async (label, cohort, planName) => {
      const user = userEvent.setup();

      jest.mocked(createFtbPlan).mockResolvedValue({
        partyConfig: { ftbCohort: cohort },
        plan: { id: `plan-${cohort}`, name: planName },
      });

      renderWithTheme(<Page />, { BRAND_NAME: Brand.LLOYDS });

      await user.click(screen.getByRole('radio', { name: label }));
      await user.click(screen.getByRole('button', { name: 'Create plan' }));

      expect(createFtbPlan).toHaveBeenCalledTimes(1);
      expect(createFtbPlan).toHaveBeenCalledWith(cohort);
      expect(await screen.findByRole('status')).toHaveTextContent(
        `Your ${planName} plan has been created.`,
      );
    },
  );
});
