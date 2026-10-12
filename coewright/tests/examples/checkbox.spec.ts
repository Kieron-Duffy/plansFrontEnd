import { test } from '../base-test';

test.describe('Checkbox Component', () => {
  test.beforeEach(async ({ checkboxPage }) => {
    await checkboxPage.open();
  });

  test('Checkbox is displayed', async ({ checkboxPage }) => {
    await test.step('Verify checkbox is displayed', async () => {
      await checkboxPage.verifyCheckboxIsDisplayed();
    });

    await test.step('Verify checkbox is not selected', async () => {
      await checkboxPage.verifyCheckboxIsNotChecked();
    });

    await test.step('Verify checkbox text is correct', async () => {
      await checkboxPage.verifyCheckboxTextIsCorrect();
    });
  });

  test('Can tick the checkbox', async ({ checkboxPage }) => {
    await test.step('Tick the checkbox', async () => {
      await checkboxPage.tickCheckbox();
    });

    await test.step('Verify checkbox is checked', async () => {
      await checkboxPage.verifyCheckboxIsChecked();
    });
  });
});
