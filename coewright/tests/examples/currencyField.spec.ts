import { test } from '../base-test';

test.describe('Currency Field Component', () => {
  test.beforeEach(async ({ currencyFieldPage }) => {
    await currencyFieldPage.open();
  });

  test('Currency field displayed correctly', async ({ currencyFieldPage }) => {
    await test.step('Verify currency field is displayed', async () => {
      await currencyFieldPage.verifyCurrencyFieldIsDisplayed();
    });

    await test.step('Verify label is displayed correctly', async () => {
      await currencyFieldPage.verifyLabelText();
    });

    await test.step('Verify input is displayed correctly', async () => {
      await currencyFieldPage.verifyCurrencyInputIsDisplayed();
    });
  });

  test('Can input alphanumeric value', async ({ currencyFieldPage }) => {
    await test.step('Verify input is enabled', async () => {
      await currencyFieldPage.verifyCurrencyInputIsEnabled();
    });

    await test.step('Input alphanumeric value', async () => {
      await currencyFieldPage.inputCurrency('a A0*1');
    });

    await test.step('Verify value is displayed', async () => {
      await currencyFieldPage.verifyCurrencyValue('a A0*1');
    });
  });

  test('Can clear currency field', async ({ currencyFieldPage }) => {
    await test.step('Verify input is enabled', async () => {
      await currencyFieldPage.verifyCurrencyInputIsEnabled();
    });

    await test.step('Input value', async () => {
      await currencyFieldPage.inputCurrency('100');
    });

    await test.step('Clear currency field', async () => {
      await currencyFieldPage.clearCurrency();
    });

    await test.step('Verify input is empty', async () => {
      await currencyFieldPage.verifyCurrencyInputIsEmpty();
    });
  });
});
