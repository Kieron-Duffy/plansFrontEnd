import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class NumberFieldPage extends InterStellarBasePage {
  private readonly numberFieldContainer: Locator =
    this.page.locator('.csl-field');

  private readonly numberInput: Locator = this.numberFieldContainer.locator(
    '.csl-number-field__input',
  );

  private readonly increaseButton: Locator = this.numberFieldContainer.locator(
    '.csl-number-field__button--up',
  );

  private readonly decreaseButton: Locator = this.numberFieldContainer.locator(
    '.csl-number-field__button--down',
  );

  private readonly fieldLabel: Locator =
    this.numberFieldContainer.locator('label');

  private readonly supportiveText: Locator = this.numberFieldContainer.locator(
    '.csl-field__supportive-text',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?id=components-forms-numberfield--default&viewMode=story`,
    );
  }

  public async increaseAmount(): Promise<void> {
    await this.increaseButton.click();
  }

  public async decreaseAmount(): Promise<void> {
    await this.decreaseButton.click();
  }

  public async setAmount(value: string): Promise<void> {
    await this.numberInput.fill(value);
  }

  public async verifyAmount(expectedValue: string): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.numberInput,
      ELEMENT_TIMEOUT,
    );
    await expect(this.numberInput).toHaveValue(expectedValue);
  }

  public async verifyNumberFieldIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.numberFieldContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyLabelText(): Promise<void> {
    await expect(this.fieldLabel).toHaveText('Example label');
  }

  public async verifySupportiveText(): Promise<void> {
    await expect(this.supportiveText).toHaveText('Example supportive text');
  }
}
