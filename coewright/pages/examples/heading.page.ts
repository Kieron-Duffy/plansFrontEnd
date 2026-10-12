import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class HeadingPage extends InterStellarBasePage {
  private readonly headingElement: Locator =
    this.page.locator('.csl-heading-s4');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-heading--default&viewMode=story`,
    );
  }

  public async verifyHeadingIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.headingElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyHeadingTextIsCorrect(): Promise<void> {
    await expect(this.headingElement).toHaveText('Example Heading');
  }
}
