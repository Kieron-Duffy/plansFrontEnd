import { test } from '../base-test';

test.describe('Error Summary Component', () => {
  test.beforeEach(async ({ errorSummaryPage }) => {
    await errorSummaryPage.open();
  });

  test('Error summary is visible', async ({ errorSummaryPage }) => {
    await test.step('Verify error summary is visible', async () => {
      await errorSummaryPage.verifyErrorSummaryIsVisible();
    });
  });
});
