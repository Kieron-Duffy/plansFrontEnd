import { test } from '../base-test';

test.describe('Dialog Component', () => {
  test.beforeEach(async ({ dialogPage }) => {
    await dialogPage.open();
  });

  test('Dialog displayed correctly', async ({ dialogPage }) => {
    await test.step('Open dialog', async () => {
      await dialogPage.openDialog();
    });

    await test.step('Verify dialog is visible', async () => {
      await dialogPage.verifyDialogIsVisible();
    });

    await test.step('Verify dialog title is displayed correctly', async () => {
      await dialogPage.verifyDialogTitleIsVisible();
    });

    await test.step('Verify dialog paragraph is displayed correctly', async () => {
      await dialogPage.verifyDialogParagraphIsVisible();
    });
  });

  test('Dialog Primary button', async ({ dialogPage }) => {
    await test.step('Open dialog', async () => {
      await dialogPage.openDialog();
    });

    await test.step('Click on primary button', async () => {
      await dialogPage.clickPrimaryButton();
    });

    await test.step('Verify Primary button text is correct', async () => {
      await dialogPage.openDialog();
      await dialogPage.verifyPrimaryButtonText('Continue');
    });
  });

  test('Dialog Secondary button', async ({ dialogPage }) => {
    await test.step('Open dialog', async () => {
      await dialogPage.openDialog();
    });

    await test.step('Click on secondary button', async () => {
      await dialogPage.clickSecondaryButton();
    });

    await test.step('Verify Secondary button text is correct', async () => {
      await dialogPage.openDialog();
      await dialogPage.verifySecondaryButtonText('Cancel');
    });
  });
});
