import { test } from '../base-test';

test.describe('Tooltip Component', () => {
  test.beforeEach(async ({ tooltipPage }) => {
    await tooltipPage.open();
  });

  test('Tooltip displayed correctly', async ({ tooltipPage }) => {
    await test.step('Verify tooltip is displayed', async () => {
      await tooltipPage.verifyTooltipIsDisplayed();
    });

    await test.step('Verify tooltip is closed', async () => {
      await tooltipPage.verifyTooltipIsClosed();
    });
  });

  test('Can expand tooltip', async ({ tooltipPage }) => {
    await test.step('Expand the tooltip', async () => {
      await tooltipPage.expandTooltip();
    });

    await test.step('Verify tooltip is expanded', async () => {
      await tooltipPage.verifyTooltipIsExpanded();
    });

    await test.step('Verify tooltip content is correct', async () => {
      await tooltipPage.verifyTooltipContentIsCorrect();
    });
  });

  test('Can close tooltip', async ({ tooltipPage }) => {
    await test.step('Expand the tooltip', async () => {
      await tooltipPage.expandTooltip();
    });

    await test.step('Close the tooltip', async () => {
      await tooltipPage.closeTooltip();
    });

    await test.step('Verify tooltip is closed', async () => {
      await tooltipPage.verifyTooltipIsClosed();
    });
  });
});
