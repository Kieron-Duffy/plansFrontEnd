import { Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class SummaryBoxPage extends InterStellarBasePage {
  private readonly summaryBoxElement: Locator = this.page
    .locator('.csl-summary-box')
    .first();

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-summarybox--default&viewMode=story`,
    );
  }

  public async verifySummaryBoxIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.summaryBoxElement,
      ELEMENT_TIMEOUT,
    );
  }
}
