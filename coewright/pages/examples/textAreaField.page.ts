import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TextAreaFieldPage extends InterStellarBasePage {
  private readonly textAreaFieldContainer: Locator =
    this.page.locator('.csl-textarea');

  private readonly textAreaElement: Locator = this.page.locator('textarea');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-textareafield--default&viewMode=story`,
    );
  }

  public async verifyTextAreaFieldIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.textAreaFieldContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async enterText(text: string): Promise<void> {
    await this.textAreaElement.fill(text);
  }

  public async verifyTextAreaFieldContainsText(text: string): Promise<void> {
    await expect(this.textAreaElement).toHaveValue(text);
  }
}
