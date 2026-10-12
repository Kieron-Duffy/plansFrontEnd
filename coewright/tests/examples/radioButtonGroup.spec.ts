import { test } from '../base-test';

test.describe('Radio Button Group Component', () => {
  test.beforeEach(async ({ radioButtonGroupPage }) => {
    await radioButtonGroupPage.open();
  });

  test('Radio button group displayed correctly', async ({
    radioButtonGroupPage,
  }) => {
    await test.step('Verify radio button group is displayed', async () => {
      await radioButtonGroupPage.verifyRadioGroupIsDisplayed();
    });

    await test.step('Verify radio button group label is correct', async () => {
      await radioButtonGroupPage.verifyRadioGroupLabel();
    });

    await test.step('Verify radio button group tooltip is correct', async () => {
      await radioButtonGroupPage.verifyRadioGroupTooltip();
    });
  });

  test('Option can be selected by name', async ({ radioButtonGroupPage }) => {
    await test.step('Select the Miss option by text', async () => {
      await radioButtonGroupPage.selectOptionByText('Miss');
    });

    await test.step('Verify the Miss option is selected', async () => {
      await radioButtonGroupPage.verifyOptionIsSelected('Miss');
    });
  });

  test('Option can be selected by index', async ({ radioButtonGroupPage }) => {
    await test.step('Select the Dr option by index', async () => {
      await radioButtonGroupPage.selectOptionByIndex(0);
    });

    await test.step('Verify the Dr option is selected', async () => {
      await radioButtonGroupPage.verifyOptionIsSelectedByIndex(0);
    });
  });
});
