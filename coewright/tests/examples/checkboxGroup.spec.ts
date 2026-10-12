import { test } from '../base-test';

test.describe('Checkbox Group Component', () => {
  test.beforeEach(async ({ checkboxGroupPage }) => {
    await checkboxGroupPage.open();
  });

  test('Checkbox group displayed correctly', async ({ checkboxGroupPage }) => {
    await test.step('Verify checkbox group is displayed', async () => {
      await checkboxGroupPage.verifyCheckboxGroupIsDisplayed();
    });
  });

  test('All checkboxes selected', async ({ checkboxGroupPage }) => {
    await test.step('Tick all the checkboxes', async () => {
      await checkboxGroupPage.selectAllCheckboxes();
    });

    await test.step('Verify all checkboxes are ticked', async () => {
      await checkboxGroupPage.verifyAllCheckboxesAreChecked();
    });
  });

  test('The checkbox group tooltip is displayed correctly', async ({
    checkboxGroupPage,
  }) => {
    await test.step('Verify tooltip is displayed', async () => {
      await checkboxGroupPage.verifyTooltipIsDisplayed();
    });

    await test.step('Verify tooltip is closed', async () => {
      await checkboxGroupPage.verifyTooltipIsClosed();
    });
  });

  test('The checkbox group tooltip expands with correct content', async ({
    checkboxGroupPage,
  }) => {
    await test.step('Expand the tooltip', async () => {
      await checkboxGroupPage.expandTooltip();
    });

    await test.step('Verify tooltip is expanded', async () => {
      await checkboxGroupPage.verifyTooltipIsExpanded();
    });
  });
});
