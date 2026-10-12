import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class ConfirmationPage extends InterStellarBasePage {
  private readonly confirmationContainer: Locator =
    this.page.locator('.csl-confirmation');

  private readonly confirmationCheckbox: Locator =
    this.confirmationContainer.locator('.csl-confirmation__input input');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-confirmation--default&viewMode=story`,
    );
  }

  public async selectConfirmation(): Promise<void> {
    await this.confirmationCheckbox.check();
  }

  public async verifyConfirmationIsChecked(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.confirmationCheckbox,
      ELEMENT_TIMEOUT,
    );
    await expect(this.confirmationCheckbox).toBeChecked();
  }

  public async verifyConfirmationIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.confirmationContainer,
      ELEMENT_TIMEOUT,
    );
  }
}
