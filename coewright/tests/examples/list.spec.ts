import { test } from '../base-test';

test.describe('List Component', () => {
  test.beforeEach(async ({ listPage }) => {
    await listPage.open();
  });

  test('List is visible', async ({ listPage }) => {
    await test.step('Verify list is visible', async () => {
      await listPage.verifyListIsVisible();
    });

    await test.step('Verify list length is 3', async () => {
      await listPage.verifyListLength(3);
    });

    await test.step('Verify first list item text', async () => {
      await listPage.verifyFirstListItemText();
    });
  });
});
