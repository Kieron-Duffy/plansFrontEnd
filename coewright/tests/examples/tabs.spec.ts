import { test } from '../base-test';

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ tabsPage }) => {
    await tabsPage.open();
  });

  test('Tabs displayed correctly', async ({ tabsPage }) => {
    await test.step('Verify tabs are displayed', async () => {
      await tabsPage.verifyTabsAreDisplayed();
    });
  });

  test('Selecting tabs', async ({ tabsPage }) => {
    await test.step('Select the second tab', async () => {
      await tabsPage.selectTabByIndex(1);
    });

    await test.step('Verify second tab is selected', async () => {
      await tabsPage.verifyTabIsSelected(1);
    });

    await test.step('Verify first tab is not selected', async () => {
      await tabsPage.verifyTabIsNotSelected(0);
    });
  });
});
