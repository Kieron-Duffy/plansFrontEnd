import { test } from '../base-test';

test.describe('Heading Component', () => {
  test.beforeEach(async ({ headingPage }) => {
    await headingPage.open();
  });

  test('Heading is visible', async ({ headingPage }) => {
    await test.step('Verify heading is visible', async () => {
      await headingPage.verifyHeadingIsVisible();
    });

    await test.step('Verify heading text is correct', async () => {
      await headingPage.verifyHeadingTextIsCorrect();
    });
  });
});
