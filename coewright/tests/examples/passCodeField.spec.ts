import { test } from '../base-test';

test.describe('PassCode Field Component', () => {
  test.beforeEach(async ({ passCodeFieldPage }) => {
    await passCodeFieldPage.open();
  });

  test('PassCode field displayed correctly', async ({ passCodeFieldPage }) => {
    await test.step('Verify passcode field is displayed', async () => {
      await passCodeFieldPage.verifyPassCodeIsDisplayed();
    });

    await test.step('Verify label is correct', async () => {
      await passCodeFieldPage.verifyLabelText();
    });
  });

  test('Can send alphanumeric string', async ({ passCodeFieldPage }) => {
    await test.step('Send alphanumeric string', async () => {
      await passCodeFieldPage.insertOtp('123a4');
    });

    await test.step('Verify only numbers are displayed', async () => {
      await passCodeFieldPage.verifyPassCodeValue('1234');
    });
  });
});
