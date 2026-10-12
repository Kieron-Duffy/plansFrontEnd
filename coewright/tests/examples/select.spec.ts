import { test } from '../base-test';

test.describe('Select Component', () => {
  test.beforeEach(async ({ selectPage }) => {
    await selectPage.open();
  });

  test('Selecting option', async ({ selectPage }) => {
    await test.step('Select the option', async () => {
      await selectPage.selectByVisibleText('130 FAKE STREET, LONDON');
    });

    await test.step('Verify option is selected', async () => {
      await selectPage.verifySelectedOption('130 FAKE STREET, LONDON');
    });
  });
});
