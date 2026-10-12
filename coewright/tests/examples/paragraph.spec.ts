import { test } from '../base-test';

test.describe('Paragraph Component', () => {
  test.beforeEach(async ({ paragraphPage }) => {
    await paragraphPage.open();
  });

  test('Paragraph is visible', async ({ paragraphPage }) => {
    await test.step('Verify paragraph is visible', async () => {
      await paragraphPage.verifyParagraphIsVisible();
    });
  });
});
