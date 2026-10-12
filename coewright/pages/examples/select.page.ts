import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class SelectPage extends InterStellarBasePage {
  private readonly selectContainer: Locator = this.page.locator('.csl-select');

  private readonly selectElement: Locator =
    this.selectContainer.locator('select');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-select--default&viewMode=story`,
    );
  }

  public async selectByVisibleText(text: string): Promise<void> {
    await this.selectElement.selectOption({ label: text });
  }

  public async verifySelectedOption(expectedText: string): Promise<void> {
    const selectedValue: string = await this.selectElement.inputValue();
    const selectedOption: Locator = this.selectElement.locator(
      `option[value="${selectedValue}"]`,
    );
    await expect(selectedOption).toHaveText(expectedText);
  }
}
