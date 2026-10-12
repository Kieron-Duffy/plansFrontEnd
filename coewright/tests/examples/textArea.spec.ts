import { test } from '../base-test';

test.describe('Text Area Component', () => {
  test.beforeEach(async ({ textAreaPage }) => {
    await textAreaPage.open();
  });

  test('Text area displayed correctly', async ({ textAreaPage }) => {
    await test.step('Verify text area is displayed', async () => {
      await textAreaPage.verifyTextAreaIsDisplayed();
    });
  });

  test('Can send text to text area', async ({ textAreaPage }) => {
    await test.step('Input text', async () => {
      await textAreaPage.inputText('whatever');
    });

    await test.step('Verify text is in text area', async () => {
      await textAreaPage.verifyTextAreaValue('whatever');
    });
  });
});
