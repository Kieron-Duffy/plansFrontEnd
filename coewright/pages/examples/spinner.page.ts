import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class SpinnerPage extends InterStellarBasePage {
  private readonly spinnerElement: Locator = this.page.locator('.csl-spinner');

  private readonly spinnerTitle: Locator = this.spinnerElement.locator(
    '.csl-spinner__title',
  );

  private readonly spinnerMessage: Locator = this.spinnerElement.locator(
    '.csl-spinner__message',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-notifications-spinner--default&viewMode=story`,
    );
  }

  public async verifySpinnerIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.spinnerElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifySpinnerTitleIsCorrect(): Promise<void> {
    await expect(this.spinnerTitle).toHaveText('Example title');
  }

  public async verifySpinnerMessageIsCorrect(): Promise<void> {
    await expect(this.spinnerMessage).toHaveText('Example message');
  }
}
