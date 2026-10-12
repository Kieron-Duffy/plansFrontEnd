import { test } from '../base-test';

test.describe('Display Text Component', () => {
  test.beforeEach(async ({ displayTextPage }) => {
    await displayTextPage.open();
  });

  test('Display text is visible', async ({ displayTextPage }) => {
    await test.step('Verify display text is visible', async () => {
      await displayTextPage.verifyDisplayTextIsVisible();
    });

    await test.step('Verify display text is correct', async () => {
      await displayTextPage.verifyDisplayTextContent();
    });
  });
});
