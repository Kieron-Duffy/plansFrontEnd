import { Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class ParagraphPage extends InterStellarBasePage {
  private readonly paragraphElement: Locator =
    this.page.locator('.csl-text-s2');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-paragraph--default&viewMode=story`,
    );
  }

  public async verifyParagraphIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.paragraphElement,
      ELEMENT_TIMEOUT,
    );
  }
}
