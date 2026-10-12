import { Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class ErrorSummaryPage extends InterStellarBasePage {
  private readonly errorSummaryElement: Locator =
    this.page.locator('.csl-error-summary');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-notifications-errorsummary--default&viewMode=story`,
    );
  }

  public async verifyErrorSummaryIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.errorSummaryElement,
      ELEMENT_TIMEOUT,
    );
  }
}
