import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TabsPage extends InterStellarBasePage {
  private readonly tabsContainer: Locator = this.page
    .locator('.csl-tabs__button-container:visible')
    .first();

  private readonly tabs: Locator = this.tabsContainer.locator('[role="tab"]');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=tests-tabs--all-variations&viewMode=story`,
    );
  }

  public async verifyTabsAreDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.tabsContainer,
      ELEMENT_TIMEOUT,
    );
    await this.webElementUtils.waitTillVisible(
      this.tabs.first(),
      ELEMENT_TIMEOUT,
    );
  }

  public async selectTabByIndex(index: number): Promise<void> {
    await this.tabs.nth(index).click();
  }

  public async verifyTabIsSelected(index: number): Promise<void> {
    const tab: Locator = this.tabs.nth(index);
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  public async verifyTabIsNotSelected(index: number): Promise<void> {
    const tab: Locator = this.tabs.nth(index);
    await expect(tab).toHaveAttribute('aria-selected', 'false');
  }
}
