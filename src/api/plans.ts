import { apiFetch } from './client';

const PLANS_PATH = '/consumer-relationship/mass-affluent/future-plans/v2/plan';

interface PlanIdResponse {
  plan: { id: string };
}

export interface NextTask {
  taskId: string;
  typeCode: string;
  categoryTypeCode: string;
  displayOrder: number;
}

export interface PlanProgress {
  planId: string;
  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;
  completionPercentage: number;
  nextTask: NextTask | null;
}

export type FtbCohort = 'ASPIRATIONAL' | 'PROSPECTIVE' | 'CUSP';

// Only the response fields currently needed by the UI.
export interface CreateFtbPlanResponse {
  partyConfig: {
    ftbCohort: FtbCohort;
  };
  plan: {
    id: string;
    name: string;
  };
}

export const createFtbPlan = (
  cohort: FtbCohort,
): Promise<CreateFtbPlanResponse> =>
  apiFetch<CreateFtbPlanResponse>(`${PLANS_PATH}/ftb`, {
    method: 'POST',
    body: JSON.stringify({ cohort }),
  });

export const getFtbPlanId = async (): Promise<string> => {
  const res = await apiFetch<PlanIdResponse>(`${PLANS_PATH}/type/ftb`);
  return res.plan.id;
};

export const getPlanProgress = (planId: string) =>
  apiFetch<PlanProgress>(
    `${PLANS_PATH}/${encodeURIComponent(planId)}/progress`,
  );
