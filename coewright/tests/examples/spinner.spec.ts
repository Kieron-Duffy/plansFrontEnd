import { test } from '../base-test';

test.describe('Spinner Component', () => {
  test.beforeEach(async ({ spinnerPage }) => {
    await spinnerPage.open();
  });

  test('Spinner is visible', async ({ spinnerPage }) => {
    await test.step('Verify spinner title is correct', async () => {
      await spinnerPage.verifySpinnerTitleIsCorrect();
    });

    await test.step('Verify spinner message is correct', async () => {
      await spinnerPage.verifySpinnerMessageIsCorrect();
    });
  });
});
