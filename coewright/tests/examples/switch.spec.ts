import { test } from '../base-test';

test.describe('Switch Component', () => {
  test.beforeEach(async ({ switchPage }) => {
    await switchPage.open();
  });

  test('Switch displayed correctly', async ({ switchPage }) => {
    await test.step('Verify switch is displayed', async () => {
      await switchPage.verifySwitchIsDisplayed();
    });

    await test.step('Verify switch label is displayed', async () => {
      await switchPage.verifySwitchLabelIsDisplayed();
    });
  });

  test('Option selected', async ({ switchPage }) => {
    await test.step('Select the no option', async () => {
      await switchPage.selectOptionByText('No');
    });

    await test.step('Verify the no option is selected', async () => {
      await switchPage.verifyOptionIsSelected('No');
    });

    await test.step('Verify the yes option is not selected', async () => {
      await switchPage.verifyOptionIsNotSelected('Yes');
    });
  });

  test('Switch tooltip displayed correctly', async ({ switchPage }) => {
    await test.step('Verify tooltip is displayed', async () => {
      await switchPage.verifyTooltipIsDisplayed();
    });

    await test.step('Verify tooltip is closed', async () => {
      await switchPage.verifyTooltipIsClosed();
    });
  });

  test('Can expand switch tooltip', async ({ switchPage }) => {
    await test.step('Expand the tooltip', async () => {
      await switchPage.expandTooltip();
    });

    await test.step('Verify tooltip is expanded', async () => {
      await switchPage.verifyTooltipIsExpanded();
    });
  });
});
