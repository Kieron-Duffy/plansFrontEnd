import { test } from '../base-test';

test.describe('Table Component', () => {
  test.beforeEach(async ({ tablePage }) => {
    await tablePage.open();
  });

  test('Table is visible', async ({ tablePage }) => {
    await test.step('Verify table is displayed correctly', async () => {
      await tablePage.verifyTableIsDisplayedCorrectly();
    });

    await test.step('Verify first heading is correct', async () => {
      await tablePage.verifyFirstHeadingText();
    });

    await test.step('Verify cell content is correct', async () => {
      await tablePage.verifyCellContent();
    });
  });
});
