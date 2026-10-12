import { test } from '../base-test';

test.describe('Interstellar SDK Routing', () => {
  test(`Direct navigation to the About Us page`, async ({
    interstellarAboutUsPage,
  }) => {
    await interstellarAboutUsPage.launchStarterKitAboutUsPage();
    await interstellarAboutUsPage.ourMissionHeadingIsDisplayed();

    const testName = test.info().title;
    const browserName = test.info().project.name.replace('local', 'chrome');
    await interstellarAboutUsPage.fullPageVisualCheck(
      `${testName} - About Us Page - ${browserName}`,
    );
  });

  test(`Navigation using links`, async ({
    interstellarHomePage,
    interstellarAboutUsPage,
  }) => {
    await interstellarHomePage.launchStarterKit();
    await interstellarHomePage.sdkContainerHeadingIsDisplayed();
    await interstellarHomePage.clickAboutUsLink();
    await interstellarAboutUsPage.ourMissionHeadingIsDisplayed();
    await interstellarAboutUsPage.clickHomeLink();
    await interstellarHomePage.sdkContainerHeadingIsDisplayed();
  });

  test(`Open problem page using non/existing/subpath`, async ({
    interstellarProblemPage,
  }) => {
    await interstellarProblemPage.launchStarterKitWithNonExistingSubPath();
    await interstellarProblemPage.problemHeadingIsDisplayed();

    const testName = test.info().title;
    const browserName = test.info().project.name.replace('local', 'chrome');
    await interstellarProblemPage.fullPageVisualCheck(
      `${testName} - Problem Page - ${browserName}`,
    );
  });
});
