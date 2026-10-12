import { test } from '../base-test';
import interstellarAppData from '../../data/interstellar-app.copytext';

//Before Each test the InterStellar starter kit will be launched on port 8080
test.beforeEach(async ({ interstellarHomePage }) => {
  await interstellarHomePage.launchStarterKit();
});

test.use({
  javaScriptEnabled: false, // Disable JavaScript for all the tests in this suite
});

test.describe('NoJS Page', () => {
  test(`NoJS Page is displayed correctly`, async ({ interstellarHomePage }) => {
    await interstellarHomePage.shouldContain(interstellarAppData.noJS.heading);
    await interstellarHomePage.shouldContain(
      interstellarAppData.noJS.links.chrome.copy,
    );
    await interstellarHomePage.shouldContain(
      interstellarAppData.noJS.links.edge.copy,
    );
    await interstellarHomePage.shouldContain(
      interstellarAppData.noJS.links.firefox.copy,
    );
    await interstellarHomePage.shouldContain(
      interstellarAppData.noJS.links.opera.copy,
    );
    await interstellarHomePage.shouldContain(
      interstellarAppData.noJS.links.safari.copy,
    );

    const testName = test.info().title;
    const browserName = test.info().project.name.replace('local', 'chrome');
    await interstellarHomePage.fullPageVisualCheck(
      `${testName} - NoJS Page - ${browserName}`,
    );
  });

  test(`NoJS Page links are reachable`, async ({ interstellarHomePage }) => {
    await interstellarHomePage.linkIsReachable(
      interstellarAppData.noJS.links.chrome.copy,
    );
    await interstellarHomePage.linkIsReachable(
      interstellarAppData.noJS.links.edge.copy,
    );
    await interstellarHomePage.linkIsReachable(
      interstellarAppData.noJS.links.firefox.copy,
    );
    await interstellarHomePage.linkIsReachable(
      interstellarAppData.noJS.links.opera.copy,
    );
    await interstellarHomePage.linkIsReachable(
      interstellarAppData.noJS.links.safari.copy,
    );
  });
});
