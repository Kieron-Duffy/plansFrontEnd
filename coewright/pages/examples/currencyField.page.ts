import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class CurrencyFieldPage extends InterStellarBasePage {
  private readonly currencyFieldContainer: Locator = this.page.locator(
    '.csl-currency-field',
  );

  private readonly currencyInput: Locator =
    this.currencyFieldContainer.locator('#currency-field');

  private readonly fieldLabel: Locator = this.currencyFieldContainer.locator(
    'label[for="currency-field"]',
  );

  private readonly supportiveText: Locator =
    this.currencyFieldContainer.locator('.csl-currency-field__supportive-text');

  private readonly tooltip: Locator = this.currencyFieldContainer.locator(
    '.csl-tooltip__inner',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-currencyfield--default&viewMode=story`,
    );
  }

  public async inputCurrency(value: string): Promise<void> {
    await this.currencyInput.fill(value);
  }

  public async clearCurrency(): Promise<void> {
    await this.currencyInput.clear();
  }

  public async verifyCurrencyValue(expectedValue: string): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.currencyInput,
      ELEMENT_TIMEOUT,
    );
    await expect(this.currencyInput).toHaveValue(expectedValue);
  }

  public async verifyCurrencyFieldIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.currencyFieldContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTooltipText(): Promise<void> {
    await this.webElementUtils.waitTillVisible(this.tooltip, ELEMENT_TIMEOUT);
    await expect(this.tooltip).toHaveText('This is an example currency field');
  }

  public async verifyLabelText(): Promise<void> {
    await expect(this.fieldLabel).toHaveText('Example label');
  }

  public async verifySupportiveText(): Promise<void> {
    await expect(this.supportiveText).toHaveText('Example supportive text');
  }

  public async verifyCurrencyInputIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.currencyInput,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyCurrencyInputIsEnabled(): Promise<void> {
    await expect(this.currencyInput).toBeEnabled();
  }

  public async verifyCurrencyInputIsEmpty(): Promise<void> {
    await expect(this.currencyInput).toHaveValue('');
  }
}
