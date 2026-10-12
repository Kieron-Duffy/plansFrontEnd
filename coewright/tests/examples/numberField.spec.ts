import { test } from '../base-test';

test.describe('Number Field Component', () => {
  test.beforeEach(async ({ numberFieldPage }) => {
    await numberFieldPage.open();
  });

  test('Number field displayed correctly', async ({ numberFieldPage }) => {
    await test.step('Verify number field is displayed', async () => {
      await numberFieldPage.verifyNumberFieldIsDisplayed();
    });

    await test.step('Verify label is correct', async () => {
      await numberFieldPage.verifyLabelText();
    });
  });

  test('Can increase amount', async ({ numberFieldPage }) => {
    await test.step('Verify initial value is 0', async () => {
      await numberFieldPage.verifyAmount('0');
    });

    await test.step('Increase the amount', async () => {
      await numberFieldPage.increaseAmount();
    });

    await test.step('Verify value is 1', async () => {
      await numberFieldPage.verifyAmount('1');
    });
  });

  test('Can decrease amount', async ({ numberFieldPage }) => {
    await test.step('Increase first to enable decrease', async () => {
      await numberFieldPage.increaseAmount();
    });

    await test.step('Verify value is 1', async () => {
      await numberFieldPage.verifyAmount('1');
    });

    await test.step('Decrease the amount', async () => {
      await numberFieldPage.decreaseAmount();
    });

    await test.step('Verify value is 0', async () => {
      await numberFieldPage.verifyAmount('0');
    });
  });

  test('Can insert value directly', async ({ numberFieldPage }) => {
    await test.step('Insert value directly', async () => {
      await numberFieldPage.setAmount('10');
    });

    await test.step('Verify amount is set', async () => {
      await numberFieldPage.verifyAmount('10');
    });
  });
});
