import { test } from '../base-test';

test.describe('Memorable Date Field Component', () => {
  test.beforeEach(async ({ memorableDateFieldPage }) => {
    await memorableDateFieldPage.open();
  });

  test('Memorable date field displayed correctly', async ({
    memorableDateFieldPage,
  }) => {
    await test.step('Verify memorable date field is displayed', async () => {
      await memorableDateFieldPage.verifyMemorableDateIsDisplayed();
    });

    await test.step('Verify label is displayed correctly', async () => {
      await memorableDateFieldPage.verifyLabelText();
    });

    await test.step('Verify day label is displayed correctly', async () => {
      await memorableDateFieldPage.verifyDayLabelText();
    });

    await test.step('Verify month label is displayed correctly', async () => {
      await memorableDateFieldPage.verifyMonthLabelText();
    });

    await test.step('Verify year label is displayed correctly', async () => {
      await memorableDateFieldPage.verifyYearLabelText();
    });
  });

  test('Can enter memorable date', async ({ memorableDateFieldPage }) => {
    await test.step('Enter day', async () => {
      await memorableDateFieldPage.enterDay(5);
    });

    await test.step('Enter month', async () => {
      await memorableDateFieldPage.enterMonth(5);
    });

    await test.step('Enter year', async () => {
      await memorableDateFieldPage.enterYear(1998);
    });

    await test.step('Verify day is correct', async () => {
      await memorableDateFieldPage.verifyDayValue('5');
    });

    await test.step('Verify month is correct', async () => {
      await memorableDateFieldPage.verifyMonthValue('5');
    });

    await test.step('Verify year is correct', async () => {
      await memorableDateFieldPage.verifyYearValue('1998');
    });
  });
});
