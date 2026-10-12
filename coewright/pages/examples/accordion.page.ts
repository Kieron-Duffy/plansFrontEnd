import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class AccordionPage extends InterStellarBasePage {
  private readonly accordionContainer: Locator =
    this.page.locator('.csl-accordion');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?id=components-content-accordion--default&viewMode=story`,
    );
  }

  public async getExpandableByIndex(index: number): Promise<Locator> {
    return this.accordionContainer.locator('button').nth(index);
  }

  public async expandExpandable(index: number): Promise<void> {
    const button: Locator = await this.getExpandableByIndex(index);
    await button.click();
  }

  public async collapseExpandable(index: number): Promise<void> {
    const button: Locator = await this.getExpandableByIndex(index);
    await button.click();
  }

  public async verifyExpandableText(
    index: number,
    expectedText: string,
  ): Promise<void> {
    const button: Locator = await this.getExpandableByIndex(index);
    await this.webElementUtils.waitTillVisible(button, ELEMENT_TIMEOUT);
    await expect(button).toContainText(expectedText);
  }

  public async verifyExpandableIsExpanded(index: number): Promise<void> {
    const button: Locator = await this.getExpandableByIndex(index);
    const isExpanded: string | null =
      await button.getAttribute('aria-expanded');
    expect(isExpanded).toBe('true');
  }

  public async verifyExpandableIsCollapsed(index: number): Promise<void> {
    const button: Locator = await this.getExpandableByIndex(index);
    const isExpanded: string | null =
      await button.getAttribute('aria-expanded');
    expect(isExpanded).toBe('false');
  }
}
