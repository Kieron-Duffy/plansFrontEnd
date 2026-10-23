const { test } = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { setTimeout: delay } = require('node:timers/promises');

const baseUrl = process.env.API_BASE_URL;
const token = process.env.BEARER_TOKEN;
const plansPath =
  '/consumer-relationship/mass-affluent/future-plans/v2/plan';

async function request(path, method = 'GET', body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-lbg-txn-correlation-id': randomUUID(),
      'x-lbg-brand': process.env.API_BRAND || 'LYDS',
      'x-lbg-org': process.env.API_ORG || 'LBG',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  });

  const text = await response.text();

  assert.ok(
    response.ok,
    `${method} ${path}: ${response.status} ${text}`,
  );

  return text ? JSON.parse(text) : undefined;
}

function assertConfiguration() {
  assert.equal(
    process.env.RUN_LIVE_API_TESTS,
    'true',
    'Set RUN_LIVE_API_TESTS=true to allow real data changes.',
  );
  assert.ok(baseUrl, 'API_BASE_URL is required.');
  assert.ok(token, 'BEARER_TOKEN is required.');
  assert.ok(['http:', 'https:'].includes(new URL(baseUrl).protocol));
}

async function createTestPlan(t) {
  assertConfiguration();
  const created = await request(`${plansPath}/ftb`, 'POST', {
    cohort: 'PROSPECTIVE',
  });

  const planId = created?.plan?.id;
  assert.equal(typeof planId, 'string');
  assert.ok(planId.length > 0);

  let isDeleted = false;
  async function deletePlan() {
    const deleted = await request(
      `${plansPath}/${encodeURIComponent(planId)}`,
      'PATCH',
      { state: 'DELETED' },
    );
    isDeleted = true;
    assert.equal(deleted.state, 'DELETED');
    return deleted;
  }

  t.after(async () => {
    if (!isDeleted) await deletePlan();
  });

  return { created, planId, deletePlan };
}

test('POST creates a plan with the requested cohort', async (t) => {
  const { created, planId } = await createTestPlan(t);

  assert.equal(created.partyConfig.ftbCohort, 'PROSPECTIVE');
  assert.equal(typeof created.plan.name, 'string');
  assert.ok(created.plan.name.length > 0);

  const progress = await request(
    `${plansPath}/${encodeURIComponent(planId)}/progress`,
  );
  assert.equal(progress.planId, planId);
});

test('PATCH deletes a newly created plan', async (t) => {
  const { deletePlan } = await createTestPlan(t);

  const deleted = await deletePlan();

  assert.equal(deleted.state, 'DELETED');
});

test('creates a plan, completes a task, and deletes the plan', async (t) => {
  const { planId } = await createTestPlan(t);
  const progressPath =
    `${plansPath}/${encodeURIComponent(planId)}/progress`;
  const before = await request(progressPath);

  assert.equal(before.planId, planId);
  assert.ok(before.nextTask?.taskId, 'New plan must have a next task.');

  await request(
    `${plansPath}/task/${encodeURIComponent(before.nextTask.taskId)}`,
    'PATCH',
    { state: 'COMPLETED' },
  );

  let after;
  const deadline = Date.now() + 15000;

  do {
    after = await request(progressPath);
    if (after.completedTasks === before.completedTasks + 1) break;
    await delay(500);
  } while (Date.now() < deadline);

  assert.equal(after.planId, planId);
  assert.equal(after.totalTasks, before.totalTasks);
  assert.equal(after.completedTasks, before.completedTasks + 1);
  assert.equal(after.remainingTasks, before.remainingTasks - 1);
  assert.ok(after.completionPercentage > before.completionPercentage);
  assert.notEqual(after.nextTask?.taskId, before.nextTask.taskId);
});