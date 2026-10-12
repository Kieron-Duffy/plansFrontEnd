import { test } from '../base-test';

test.describe('TextField Component', () => {
  test.beforeEach(async ({ textFieldPage }) => {
    await textFieldPage.open();
  });

  test('Textfield displayed correctly', async ({ textFieldPage }) => {
    await test.step('Verify textfield is displayed', async () => {
      await textFieldPage.verifyTextFieldIsDisplayed();
    });

    await test.step('Verify textfield label is correct', async () => {
      await textFieldPage.verifyTextFieldLabel();
    });

    await test.step('Verify textfield tooltip is correct', async () => {
      await textFieldPage.verifyTextFieldTooltip();
    });
  });

  test('Can send input to text field', async ({ textFieldPage }) => {
    await test.step('Verify text field is enabled', async () => {
      await textFieldPage.verifyTextFieldIsEnabled();
    });

    await test.step('Input a string to the text field', async () => {
      const testString = 'Test input text';
      await textFieldPage.inputText(testString);
    });

    await test.step('Verify string is in the text field', async () => {
      await textFieldPage.verifyTextFieldValue('Test input text');
    });
  });

  test('Can clear text field', async ({ textFieldPage }) => {
    await test.step('Input a string to the text field', async () => {
      await textFieldPage.inputText('Test input to clear');
    });

    await test.step('Clear the text field', async () => {
      await textFieldPage.clearTextField();
    });

    await test.step('Verify text field is empty', async () => {
      await textFieldPage.verifyTextFieldIsEmpty();
    });
  });
});
