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

export const getFtbPlanId = async (): Promise<string> => {
  const res = await apiFetch<PlanIdResponse>(`${PLANS_PATH}/type/ftb`);
  return res.plan.id;
};

export const getPlanProgress = (planId: string) =>
  apiFetch<PlanProgress>(
    `${PLANS_PATH}/${encodeURIComponent(planId)}/progress`,
  );
