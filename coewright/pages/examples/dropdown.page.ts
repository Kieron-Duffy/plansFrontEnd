import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class DropdownPage extends InterStellarBasePage {
  private readonly dropdownContainer: Locator = this.page.locator('.csl-field');

  private readonly dropdownSelect: Locator = this.dropdownContainer.locator(
    '.csl-select__select',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-dropdown--default&viewMode=story`,
    );
  }

  public async selectByVisibleText(text: string): Promise<void> {
    await this.dropdownSelect.selectOption({ label: text });
  }

  public async verifySelectedOption(expectedText: string): Promise<void> {
    const selectedOption: Locator =
      this.dropdownSelect.locator('option:checked');
    await expect(selectedOption).toHaveText(expectedText);
  }
}
