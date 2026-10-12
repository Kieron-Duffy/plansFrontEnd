import { test } from '../base-test';

//Before Each test the InterStellar starter kit will be launched on port 8080
test.beforeEach(async ({ interstellarHomePage }) => {
  await interstellarHomePage.launchStarterKit();
});

test.describe('The InterStellar app is running', () => {
  test(`The InterStellar Home Page is Displayed`, async ({
    interstellarHomePage,
  }) => {
    await interstellarHomePage.sdkContainerHeadingIsDisplayed();
    await interstellarHomePage.constellationHeadingIsDisplayed();
    await interstellarHomePage.footerIsDisplayed();
    await interstellarHomePage.playgroundButtonsDisplayed();
    await interstellarHomePage.coewrightHeroDisplayedCorrectly();

    const testName = test.info().title;
    // TODO: yep, an awful hack, I know
    const browserName = test.info().project.name.replace('local', 'chrome');
    await interstellarHomePage.fullPageVisualCheck(
      `${testName} - Home Page - ${browserName}`,
    );
  });
});
