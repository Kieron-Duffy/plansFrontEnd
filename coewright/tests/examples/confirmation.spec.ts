import { test } from '../base-test';

test.describe('Confirmation Component', () => {
  test.beforeEach(async ({ confirmationPage }) => {
    await confirmationPage.open();
  });

  test('Confirmation displayed correctly', async ({ confirmationPage }) => {
    await test.step('Verify confirmation is displayed', async () => {
      await confirmationPage.verifyConfirmationIsDisplayed();
    });
  });

  test('Can select confirmation', async ({ confirmationPage }) => {
    await test.step('Select confirmation checkbox', async () => {
      await confirmationPage.selectConfirmation();
    });

    await test.step('Verify confirmation is checked', async () => {
      await confirmationPage.verifyConfirmationIsChecked();
    });
  });
});
