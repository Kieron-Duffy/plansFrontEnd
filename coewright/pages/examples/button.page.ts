import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class ButtonPage extends InterStellarBasePage {
  private readonly buttonLocator: Locator = this.page.locator('.csl-button');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-actions-button--default&viewMode=story`,
    );
  }

  public async verifyButtonIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.buttonLocator,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyButtonText(expectedText: string): Promise<void> {
    await expect(this.buttonLocator).toHaveText(expectedText);
  }
}
