import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class PassCodeFieldPage extends InterStellarBasePage {
  private readonly passCodeContainer: Locator = this.page.locator('.csl-field');

  private readonly passCodeInput: Locator =
    this.passCodeContainer.locator('input');

  private readonly passCodeLabel: Locator =
    this.passCodeContainer.locator('.csl-field-label');

  private readonly tooltip: Locator = this.passCodeContainer.locator(
    '.csl-tooltip__inner',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-passcodefield--default&viewMode=story`,
    );
  }

  public async insertOtp(otp: string): Promise<void> {
    await this.passCodeInput.fill(otp);
  }

  public async verifyPassCodeIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.passCodeContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyLabelText(): Promise<void> {
    await expect(this.passCodeLabel).toHaveText('Enter your one-time passcode');
  }

  public async verifyTooltipText(): Promise<void> {
    await expect(this.tooltip).toHaveText('How do I find my OTP?');
  }

  public async verifyPassCodeValue(expectedValue: string): Promise<void> {
    const actualValue = await this.passCodeInput.inputValue();
    await expect(actualValue.trim()).toBe(expectedValue);
  }
}
