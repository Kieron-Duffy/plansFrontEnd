import { test } from '../base-test';

test.describe('Text Input Component', () => {
  test.beforeEach(async ({ textInputPage }) => {
    await textInputPage.open();
  });

  test('Text input displayed correctly', async ({ textInputPage }) => {
    await test.step('Verify text input is displayed', async () => {
      await textInputPage.verifyInputIsDisplayed();
    });
  });

  test('Can send value to text input', async ({ textInputPage }) => {
    await test.step('Input a value', async () => {
      await textInputPage.inputText('a A0*1');
    });

    await test.step('Verify value is in text input', async () => {
      await textInputPage.verifyInputValue('a A0*1');
    });
  });

  test('Can clear text input', async ({ textInputPage }) => {
    await test.step('Input a value', async () => {
      await textInputPage.inputText('test value');
    });

    await test.step('Clear the text input', async () => {
      await textInputPage.clearText();
    });

    await test.step('Verify text input is empty', async () => {
      await textInputPage.verifyInputIsEmpty();
    });
  });
});
