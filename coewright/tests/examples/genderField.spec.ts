import { test } from '../base-test';

test.describe('Gender Field Component', () => {
  test.beforeEach(async ({ genderFieldPage }) => {
    await genderFieldPage.open();
  });

  test('Option can be selected', async ({ genderFieldPage }) => {
    await test.step('Verify gender field is displayed correctly', async () => {
      await genderFieldPage.verifyGenderFieldIsDisplayed();
    });

    await test.step('Select Male option', async () => {
      await genderFieldPage.selectOptionByText('Male');
    });

    await test.step('Verify Male option is selected', async () => {
      await genderFieldPage.verifyOptionIsSelected('Male');
    });

    await test.step('Verify Female option is not selected', async () => {
      await genderFieldPage.verifyOptionIsNotSelected('Female');
    });
  });

  test('Gender field displayed correctly', async ({ genderFieldPage }) => {
    await test.step('Verify gender field is displayed correctly', async () => {
      await genderFieldPage.verifyGenderFieldIsDisplayed();
    });

    await test.step('Verify gender field label is displayed correctly', async () => {
      await genderFieldPage.verifyGenderFieldLabelIsDisplayed();
    });

    await test.step('Verify gender field tooltip is displayed correctly', async () => {
      await genderFieldPage.verifyGenderFieldTooltipIsDisplayed();
    });
  });

  test('The gender field tooltip is displayed correctly', async ({
    genderFieldPage,
  }) => {
    await test.step('Verify the gender tooltip is displayed correctly', async () => {
      await genderFieldPage.verifyGenderFieldTooltipIsDisplayed();
    });

    await test.step('Verify the gender tooltip is closed', async () => {
      await genderFieldPage.verifyTooltipIsClosed();
    });
  });

  test('The gender field tooltip expands with correct content', async ({
    genderFieldPage,
  }) => {
    await test.step('Expand the gender tooltip', async () => {
      await genderFieldPage.expandTooltip();
    });

    await test.step('Verify the gender tooltip is expanded', async () => {
      await genderFieldPage.verifyTooltipIsExpanded();
    });

    await test.step('Verify the expanded gender tooltip content is correct', async () => {
      await genderFieldPage.verifyTooltipContent();
    });
  });
});
