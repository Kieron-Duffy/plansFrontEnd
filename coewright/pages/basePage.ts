import { Eyes, Target } from '@applitools/eyes-playwright';
import { test } from '@playwright/test';
import { BasePage, HeadMethodOptions } from '@qecoe/playwright_automation';

import {
  getApplitoolsApiKey,
  getApplitoolsServerUrl,
  isApplitoolsRunEnabled,
} from '../utils/applitools';

export class InterStellarBasePage extends BasePage {
  consoleLogs: string[] = [];

  public async performAccessibilityScan(pageName: string) {
    await test.step(`Accessibility scan for ${pageName} page`, async () => {
      await this.axeUtils.checkAccessibilityViolations(
        pageName,
        'interstellar',
        './reports',
      );
    });
  }

  public async shouldContain(elementText: string) {
    // arbitrary timeout: if element is not visible within 5 seconds, test should fail
    // a web page that loads in more than 5 seconds is a sign of poor performance
    const elementLocator = this.page.getByText(elementText);
    await this.webElementUtils.waitTillVisible(elementLocator, ELEMENT_TIMEOUT);
  }

  public async linkIsReachable(elementLocator: string) {
    const linkLocator = this.page.getByText(elementLocator);
    const href = await linkLocator.getAttribute('href');

    // workaround: links start with www, must append protocol
    const link = href.startsWith('https') ? href : `https:${href}`;

    const context = await this.apiUtils.requestContextwithOptions({
      proxy: {
        // needed only for CI, passing locally without
        server: process.env.PROXY_SERVER,
      },
    });

    const userOptions: HeadMethodOptions = {
      ignoreHTTPSErrors: true,
      url: link,
      maxRedirects: 5,
    };

    const response = await this.apiUtils.SendHeadRequest(context, userOptions);

    const expectedStatusCode = 200;
    const actualStatusCode = response.status();
    this.assertUtils.assertEquals(
      actualStatusCode,
      expectedStatusCode,
      'Comparing actual status code with expected',
    );
  }

  public async recordConsoleLogs(): Promise<void> {
    this.page.on('console', (msg) => {
      this.consoleLogs.push(msg.text());
    });
  }

  public getConsoleLogs(): string[] {
    return this.consoleLogs;
  }

  public messageIncludedInConsoleLogs(
    message: string,
    errorMessage: string,
  ): void {
    if (this.consoleLogs.includes(message)) {
      return;
    }
    throw new Error(errorMessage);
  }

  public async fullPageVisualCheck(pageName: string): Promise<void> {
    if (!isApplitoolsRunEnabled()) {
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`Performing full page visual check for ${pageName} page`);
    /*
      Configuration parameters are documented at:
      https://applitools.com/tutorials/playwright/api/overview
    */
    // TODO: explore options for batch id, should help with filtering results in the dashboard
    const eyes = new Eyes({
      apiKey: getApplitoolsApiKey(),
      // TODO: think about this hardcoded value, maybe we can use a config file to be able to change it easily
      appName: 'InterStellar Starter Kit',
      serverUrl: getApplitoolsServerUrl(),
      testName: pageName,
    });

    eyes.setProxy(process.env.PROXY_SERVER);
    await eyes.open(this.page);
    await eyes.check(pageName, Target.window().fully());
    await eyes.close();
  }
}
