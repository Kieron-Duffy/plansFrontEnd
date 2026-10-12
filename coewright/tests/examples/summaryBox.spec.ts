import { test } from '../base-test';

test.describe('Summary Box Component', () => {
  test.beforeEach(async ({ summaryBoxPage }) => {
    await summaryBoxPage.open();
  });

  test('Summary box is visible', async ({ summaryBoxPage }) => {
    await test.step('Verify summary box is visible', async () => {
      await summaryBoxPage.verifySummaryBoxIsVisible();
    });
  });
});
