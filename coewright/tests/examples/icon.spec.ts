import { test } from '../base-test';

test.describe('Icon Component', () => {
  test.beforeEach(async ({ iconPage }) => {
    await iconPage.open();
  });

  test('Icon displayed correctly', async ({ iconPage }) => {
    await test.step('Verify icon is displayed correctly', async () => {
      await iconPage.verifyIconIsVisible();
    });

    await test.step('Verify icon dimensions are correct', async () => {
      await iconPage.verifyIconDimensions();
    });
  });
});
