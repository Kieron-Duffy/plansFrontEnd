import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class RadioButtonGroupPage extends InterStellarBasePage {
  private readonly radioGroupContainer: Locator =
    this.page.locator('.csl-field');

  private readonly radioGroupLabel: Locator = this.radioGroupContainer.locator(
    '[data-csl-selector="field-label"]',
  );

  private readonly radioGroupTooltip: Locator =
    this.radioGroupContainer.locator('[data-csl-selector="tooltip-target"]');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-radiobuttongroup--default&viewMode=story`,
    );
  }

  public async verifyRadioGroupIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.radioGroupContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyRadioGroupLabel(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.radioGroupLabel.first(),
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyRadioGroupTooltip(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.radioGroupTooltip,
      ELEMENT_TIMEOUT,
    );
  }

  public async selectOptionByText(text: string): Promise<void> {
    const radioOption: Locator = this.radioGroupContainer.getByText(text, {
      exact: true,
    });
    await radioOption.click();
  }

  public async selectOptionByIndex(index: number): Promise<void> {
    const radioInputs: Locator = this.radioGroupContainer.locator(
      'input[type="radio"]',
    );
    await radioInputs.nth(index).check();
  }

  public async verifyOptionIsSelected(text: string): Promise<void> {
    const radioInput: Locator = this.radioGroupContainer.getByRole('radio', {
      name: text,
    });
    await expect(radioInput).toBeChecked();
  }

  public async verifyOptionIsSelectedByIndex(index: number): Promise<void> {
    const radioInputs: Locator = this.radioGroupContainer.locator(
      'input[type="radio"]',
    );
    await expect(radioInputs.nth(index)).toBeChecked();
  }
}
