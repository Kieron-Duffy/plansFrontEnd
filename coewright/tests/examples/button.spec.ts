import { test } from '../base-test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ buttonPage }) => {
    await buttonPage.open();
  });

  test('Button displayed correctly', async ({ buttonPage }) => {
    await test.step('Verify button is displayed', async () => {
      await buttonPage.verifyButtonIsDisplayed();
    });

    await test.step('Verify button text is correct', async () => {
      await buttonPage.verifyButtonText('Button');
    });
  });
});
