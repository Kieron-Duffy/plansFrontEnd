import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TextInputPage extends InterStellarBasePage {
  private readonly inputElement: Locator = this.page.locator('.csl-text-input');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-textinput--default&viewMode=story`,
    );
  }

  public async inputText(text: string): Promise<void> {
    await this.inputElement.fill(text);
  }

  public async clearText(): Promise<void> {
    await this.inputElement.clear();
  }

  public async verifyInputValue(expectedValue: string): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.inputElement,
      ELEMENT_TIMEOUT,
    );
    await expect(this.inputElement).toHaveValue(expectedValue);
  }

  public async verifyInputIsEmpty(): Promise<void> {
    await expect(this.inputElement).toHaveValue('');
  }

  public async verifyInputIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.inputElement,
      ELEMENT_TIMEOUT,
    );
  }
}
