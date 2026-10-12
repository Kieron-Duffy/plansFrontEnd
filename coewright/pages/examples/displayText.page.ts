import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class DisplayTextPage extends InterStellarBasePage {
  private readonly displayTextElement: Locator =
    this.page.locator('.csl-display-s8');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-displaytext--default&viewMode=story`,
    );
  }

  public async verifyDisplayTextIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.displayTextElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyDisplayTextContent(): Promise<void> {
    await expect(this.displayTextElement).toHaveText(
      'Can you do more with your pension right now?',
    );
  }
}
