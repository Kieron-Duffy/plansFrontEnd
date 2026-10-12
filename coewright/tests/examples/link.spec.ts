import { test } from '../base-test';

test.describe('Link Component', () => {
  test.beforeEach(async ({ linkPage }) => {
    await linkPage.open();
  });

  test('Link is visible', async ({ linkPage }) => {
    await test.step('Verify link is visible', async () => {
      await linkPage.verifyLinkIsVisible();
    });

    await test.step('Verify link text is correct', async () => {
      await linkPage.verifyLinkTextIsCorrect();
    });

    await test.step('Verify link href is correct', async () => {
      await linkPage.verifyLinkHrefIsCorrect();
    });
  });
});
