import { test } from '../base-test';

test.describe('Notification Component', () => {
  test.beforeEach(async ({ notificationPage }) => {
    await notificationPage.open();
  });

  test('Notification is visible', async ({ notificationPage }) => {
    await test.step('Verify information notification is displayed', async () => {
      await notificationPage.verifyInformationNotificationIsDisplayed();
    });

    await test.step('Verify warning notification is displayed', async () => {
      await notificationPage.verifyWarningNotificationIsDisplayed();
    });

    await test.step('Verify critical notification is displayed', async () => {
      await notificationPage.verifyCriticalNotificationIsDisplayed();
    });

    await test.step('Verify success notification is displayed', async () => {
      await notificationPage.verifySuccessNotificationIsDisplayed();
    });

    await test.step('Verify information notification content is correct', async () => {
      await notificationPage.verifyInformationNotificationContent();
    });
  });
});
