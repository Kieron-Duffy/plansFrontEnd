import { test, expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from './basePage';
import interstellarAppData from '../data/interstellar-app.copytext';

export class InterstellarWebviewPage extends InterStellarBasePage {
  webviewHeader: Locator = this.page.getByTestId(
    interstellarAppData.headerLocator,
  );

  webviewFooter: Locator = this.page.getByTestId(
    interstellarAppData.footerLocator,
  );

  webviewHeading: Locator = this.page.getByText(
    interstellarAppData.webview.headingCopy,
  );

  iosButton: Locator = this.page.getByTestId(
    interstellarAppData.webview.iosButton,
  );

  public async launchDefaultStarterKitWebviewPage(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}web-view`);
  }

  public async launchStarterKitWebviewPageInWebviewMode(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}web-view?isWebview=true`);
  }

  public async launchStarterKitWebviewPageNotInWebviewMode(): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}web-view?isWebview=false`);
  }

  public async headerIsDisplayed(): Promise<void> {
    await test.step(`Checking the SDK header is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.webviewHeader,
        ELEMENT_TIMEOUT,
      );
    });
  }

  public async headerIsNotDisplayed(): Promise<void> {
    await test.step(`Checking the SDK header is displayed`, async () => {
      await expect(this.webviewHeader).toBeHidden();
    });
  }

  public async footerIsDisplayed(): Promise<void> {
    await test.step(`Checking the SDK footer is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.webviewFooter,
        ELEMENT_TIMEOUT,
      );
    });
  }

  public async footerIsNotDisplayed(): Promise<void> {
    await test.step(`Checking the SDK footer is displayed`, async () => {
      await expect(this.webviewFooter).toBeHidden();
    });
  }

  public async webviewHeadingIsDisplayed(): Promise<void> {
    await test.step(`Checking the webview heading is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.webviewHeading,
        ELEMENT_TIMEOUT,
      );
    });
  }

  public async jsBridgeIsInitiated(): Promise<void> {
    await test.step(`Checking the JSBridge is initiated`, async () => {
      this.messageIncludedInConsoleLogs(
        'running webview initiateJavaScriptBridge function',
        'JSBridge initiation log not found in console logs',
      );
    });
  }

  public async webViewCallTriggered() {
    await test.step(`Checking the JSBridge is initiated`, async () => {
      this.messageIncludedInConsoleLogs(
        'running webview isIos function',
        'Webview isIosButton press call log not found in console logs',
      );
    });
  }

  public async clickOnIosButton() {
    await test.step(`Click on the ios button`, async () =>
      this.iosButton.click());
  }
}
