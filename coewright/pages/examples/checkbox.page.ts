import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class CheckboxPage extends InterStellarBasePage {
  private readonly checkboxContainer: Locator =
    this.page.locator('.csl-checkbox');

  private readonly checkboxInput: Locator =
    this.checkboxContainer.locator('input');

  private readonly checkboxLabel: Locator = this.checkboxContainer.locator(
    '.csl-checkbox__label',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-checkbox--default&viewMode=story`,
    );
  }

  public async verifyCheckboxIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.checkboxContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyCheckboxLabel(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.checkboxLabel,
      ELEMENT_TIMEOUT,
    );
  }

  public async tickCheckbox(): Promise<void> {
    await this.checkboxInput.check();
  }

  public async verifyCheckboxIsChecked(): Promise<void> {
    await expect(this.checkboxInput).toBeChecked();
  }

  public async verifyCheckboxIsNotChecked(): Promise<void> {
    await expect(this.checkboxInput).not.toBeChecked();
  }

  public async verifyCheckboxTextIsCorrect(): Promise<void> {
    await expect(this.checkboxLabel).toHaveText('Check me');
  }
}
