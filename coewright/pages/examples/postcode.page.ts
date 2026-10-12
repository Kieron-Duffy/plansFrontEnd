import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class PostcodePage extends InterStellarBasePage {
  private readonly postcodeContainer: Locator = this.page.locator('.csl-field');

  private readonly postcodeInput: Locator =
    this.postcodeContainer.locator('input');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-postcodefield--default&viewMode=story`,
    );
  }

  public async inputPostcode(postcode: string): Promise<void> {
    await this.postcodeInput.fill(postcode);
  }

  public async clearPostcode(): Promise<void> {
    await this.postcodeInput.clear();
  }

  public async verifyPostcodeValue(expectedValue: string): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.postcodeInput,
      ELEMENT_TIMEOUT,
    );
    await expect(this.postcodeInput).toHaveValue(expectedValue);
  }

  public async verifyPostcodeIsEmpty(): Promise<void> {
    await expect(this.postcodeInput).toHaveValue('');
  }

  public async verifyPostcodeIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.postcodeContainer,
      ELEMENT_TIMEOUT,
    );
  }
}
