//IMPORTANT: the env variable AXE_FLAG needs to be set to true before running accessibility
//When this variable is set to false, scan won't be performed and tests will always pass!

import { test } from '../base-test';

//Before Each test the InterStellar starter kit will be launched on port 8080
test.beforeEach(async ({ interstellarHomePage }) => {
  await interstellarHomePage.launchStarterKit();
});

test.describe('Accessibility Scan', () => {
  test('Home Page', async ({ interstellarHomePage }) => {
    await interstellarHomePage.performAccessibilityScan('home');
  });

  test('About us', async ({ interstellarAboutUsPage }) => {
    await interstellarAboutUsPage.launchStarterKitAboutUsPage();
    await interstellarAboutUsPage.performAccessibilityScan('about us');
  });
});
