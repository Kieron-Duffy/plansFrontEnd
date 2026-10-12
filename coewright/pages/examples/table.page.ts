import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TablePage extends InterStellarBasePage {
  private readonly tableElement: Locator = this.page.locator('.csl-table');

  private readonly tableRows: Locator = this.tableElement.locator('tbody tr');

  private readonly tableHeadings: Locator =
    this.tableElement.locator('thead tr th');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-table--default&viewMode=story`,
    );
  }

  public async verifyTableIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.tableElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTableIsDisplayedCorrectly(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.tableElement,
      ELEMENT_TIMEOUT,
    );
    await expect(this.tableRows).not.toHaveCount(0);
  }

  public async verifyFirstHeadingText(): Promise<void> {
    const firstHeading = this.tableHeadings.nth(1);
    await expect(firstHeading).toHaveText('Heading 2');
  }

  public async verifyCellContent(): Promise<void> {
    const row = this.tableElement.locator('tbody tr').first();
    const cell = row.locator('td').nth(2);
    await expect(cell).toContainText('Row 1c');
  }
}
