import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class LinkPage extends InterStellarBasePage {
  private readonly linkElement: Locator = this.page.locator('.csl-link');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-actions-link--default&viewMode=story`,
    );
  }

  public async verifyLinkIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.linkElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyLinkTextIsCorrect(): Promise<void> {
    await expect(this.linkElement).toContainText('I am a link');
  }

  public async verifyLinkHrefIsCorrect(): Promise<void> {
    await expect(this.linkElement).toHaveAttribute(
      'href',
      'https://www.lloydsbank.com',
    );
  }
}
