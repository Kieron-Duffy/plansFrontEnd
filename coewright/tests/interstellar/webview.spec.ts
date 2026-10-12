import { test } from '../base-test';

test.describe('Interstellar Webview Page', () => {
  test(`Default Webview Page with JSBridge logs`, async ({
    interstellarWebviewPage,
  }) => {
    await interstellarWebviewPage.recordConsoleLogs();
    await interstellarWebviewPage.launchDefaultStarterKitWebviewPage();
    await interstellarWebviewPage.jsBridgeIsInitiated();
    await interstellarWebviewPage.headerIsDisplayed();
    await interstellarWebviewPage.footerIsDisplayed();
    await interstellarWebviewPage.webviewHeadingIsDisplayed();

    //TODO: logging it here to see if the console logs are captured correctly
    let logs = interstellarWebviewPage.getConsoleLogs();
    console.log('Console logs:', logs);
    await interstellarWebviewPage.clickOnIosButton();
    await interstellarWebviewPage.webViewCallTriggered();
    //TODO: logging it here to see if the console logs are captured correctly
    logs = interstellarWebviewPage.getConsoleLogs();
    console.log('Console logs:', logs);

    const testName = test.info().title;
    const browserName = test.info().project.name.replace('local', 'chrome');
    await interstellarWebviewPage.fullPageVisualCheck(
      `${testName} - Webview Page - ${browserName}`,
    );
  });

  test(`Page in webview mode via query param`, async ({
    interstellarWebviewPage,
  }) => {
    await interstellarWebviewPage.launchStarterKitWebviewPageInWebviewMode();
    await interstellarWebviewPage.headerIsNotDisplayed();
    await interstellarWebviewPage.footerIsNotDisplayed();
    await interstellarWebviewPage.webviewHeadingIsDisplayed();
  });

  test(`Page not in webview mode via query param`, async ({
    interstellarWebviewPage,
  }) => {
    await interstellarWebviewPage.launchStarterKitWebviewPageNotInWebviewMode();
    await interstellarWebviewPage.headerIsDisplayed();
    await interstellarWebviewPage.footerIsDisplayed();
    await interstellarWebviewPage.webviewHeadingIsDisplayed();
  });
});
