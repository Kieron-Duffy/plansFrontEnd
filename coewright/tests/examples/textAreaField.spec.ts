import { test } from '../base-test';

test.describe('Text Area Field Component', () => {
  test.beforeEach(async ({ textAreaFieldPage }) => {
    await textAreaFieldPage.open();
  });

  test('Text area field is visible', async ({ textAreaFieldPage }) => {
    await test.step('Verify text area field is visible', async () => {
      await textAreaFieldPage.verifyTextAreaFieldIsVisible();
    });
  });

  test('Can enter text', async ({ textAreaFieldPage }) => {
    await test.step('Enter text', async () => {
      await textAreaFieldPage.enterText('Test text');
    });

    await test.step('Verify text area field contains text', async () => {
      await textAreaFieldPage.verifyTextAreaFieldContainsText('Test text');
    });
  });
});
