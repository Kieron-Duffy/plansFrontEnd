import { test } from '../base-test';

test.describe('Postcode Component', () => {
  test.beforeEach(async ({ postcodePage }) => {
    await postcodePage.open();
  });

  test('Postcode displayed correctly', async ({ postcodePage }) => {
    await test.step('Verify postcode is displayed', async () => {
      await postcodePage.verifyPostcodeIsDisplayed();
    });
  });

  test('Can input postcode', async ({ postcodePage }) => {
    await test.step('Input postcode', async () => {
      await postcodePage.inputPostcode('SW5 0PX');
    });

    await test.step('Verify postcode value', async () => {
      await postcodePage.verifyPostcodeValue('SW5 0PX');
    });
  });

  test('Can clear postcode', async ({ postcodePage }) => {
    await test.step('Input postcode', async () => {
      await postcodePage.inputPostcode('SW5 0PX');
    });

    await test.step('Clear postcode', async () => {
      await postcodePage.clearPostcode();
    });

    await test.step('Verify postcode is empty', async () => {
      await postcodePage.verifyPostcodeIsEmpty();
    });
  });
});
