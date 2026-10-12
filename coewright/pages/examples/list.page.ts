import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class ListPage extends InterStellarBasePage {
  private readonly listElement: Locator = this.page.locator('.csl-list');

  private readonly listItems: Locator = this.listElement.locator('li');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-list--default&viewMode=story`,
    );
  }

  public async verifyListIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.listElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyListLength(expectedLength: number): Promise<void> {
    await expect(this.listItems).toHaveCount(expectedLength);
  }

  public async verifyFirstListItemText(): Promise<void> {
    const firstItem = this.listItems.first();
    await expect(firstItem).toHaveText('This is a default list item.');
  }
}
