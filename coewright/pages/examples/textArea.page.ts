import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TextAreaPage extends InterStellarBasePage {
  private readonly textAreaElement: Locator = this.page.locator('textarea');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-textarea--default&viewMode=story`,
    );
  }

  public async inputText(text: string): Promise<void> {
    await this.textAreaElement.fill(text);
  }

  public async verifyTextAreaIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.textAreaElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTextAreaValue(expectedValue: string): Promise<void> {
    await expect(this.textAreaElement).toHaveValue(expectedValue);
  }
}
