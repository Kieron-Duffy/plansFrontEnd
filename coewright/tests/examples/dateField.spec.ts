import { test } from '../base-test';

test.describe('Date Field Component', () => {
  test.beforeEach(async ({ dateFieldPage }) => {
    await dateFieldPage.open();
  });

  test('Date field displayed correctly', async ({ dateFieldPage }) => {
    await test.step('Verify date field is displayed', async () => {
      await dateFieldPage.verifyDateFieldIsDisplayed();
    });

    await test.step('Verify label is displayed correctly', async () => {
      await dateFieldPage.verifyLabelText();
    });

    await test.step('Verify day input is displayed correctly', async () => {
      await dateFieldPage.verifyDayInputIsDisplayed();
    });
  });

  test('Can enter date', async ({ dateFieldPage }) => {
    await test.step('Enter day', async () => {
      await dateFieldPage.enterDay(5);
    });

    await test.step('Enter month', async () => {
      await dateFieldPage.enterMonthByName('July');
    });

    await test.step('Enter year', async () => {
      await dateFieldPage.enterYear(1998);
    });

    await test.step('Verify day is correct', async () => {
      await dateFieldPage.verifyDayValue('5');
    });

    await test.step('Verify month is correct', async () => {
      await dateFieldPage.verifyMonthValue('7');
    });

    await test.step('Verify year is correct', async () => {
      await dateFieldPage.verifyYearValue('1998');
    });
  });
});
