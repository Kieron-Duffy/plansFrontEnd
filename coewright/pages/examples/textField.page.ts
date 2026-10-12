import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TextFieldPage extends InterStellarBasePage {
  private readonly textFieldContainer: Locator =
    this.page.locator('.csl-field');

  private readonly textFieldInput: Locator =
    this.textFieldContainer.locator('.csl-text-input');

  private readonly textFieldLabel: Locator = this.textFieldContainer.locator(
    '[data-csl-selector="field-label"]',
  );

  private readonly textFieldTooltip: Locator = this.textFieldContainer.locator(
    '[data-csl-selector="tooltip-target"]',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-textfield--default&viewMode=story`,
    );
  }

  public async verifyTextFieldIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.textFieldContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTextFieldLabel(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.textFieldLabel,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTextFieldTooltip(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.textFieldTooltip,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTextFieldIsEnabled(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.textFieldInput,
      ELEMENT_TIMEOUT,
    );
    await expect(this.textFieldInput).toBeEnabled();
  }

  public async inputText(text: string): Promise<void> {
    await this.textFieldInput.fill(text);
  }

  public async clearTextField(): Promise<void> {
    await this.textFieldInput.clear();
  }

  public async verifyTextFieldValue(expectedValue: string): Promise<void> {
    await expect(this.textFieldInput).toHaveValue(expectedValue);
  }

  public async verifyTextFieldIsEmpty(): Promise<void> {
    await expect(this.textFieldInput).toHaveValue('');
  }
}
