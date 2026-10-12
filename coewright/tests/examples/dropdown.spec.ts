import { test } from '../base-test';

test.describe('Dropdown Component', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.open();
  });

  test('Select first option from dropdown', async ({ dropdownPage }) => {
    await test.step('Select the first option', async () => {
      await dropdownPage.selectByVisibleText('First');
    });

    await test.step('Verify first option is selected', async () => {
      await dropdownPage.verifySelectedOption('First');
    });
  });
});
