import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class CheckboxGroupPage extends InterStellarBasePage {
  private readonly checkboxGroupContainer: Locator =
    this.page.locator('.csl-field');

  private readonly checkboxes: Locator = this.checkboxGroupContainer.locator(
    'input[type="checkbox"]',
  );

  private readonly checkboxGroupTooltip: Locator =
    this.checkboxGroupContainer.locator('[data-csl-selector="tooltip-target"]');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-checkboxgroup--default&viewMode=story`,
    );
    await this.page.waitForLoadState('networkidle');
  }

  public async verifyCheckboxGroupIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.checkboxGroupContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async selectAllCheckboxes(): Promise<void> {
    const checkboxCount: number = await this.checkboxes.count();

    // This can be done more efficiently using a promise.all to run checks in parallel
    // However this can cause flaky tests and is less readable
    // Therefore I have bypassed the linting rule that prevents using an await in a loop

    for (let index = 0; index < checkboxCount; index += 1) {
      const checkbox: Locator = this.checkboxes.nth(index);

      await checkbox.waitFor({ state: 'visible' });

      if (!(await checkbox.isChecked())) {
        await checkbox.check({ force: true });
      }
    }
  }

  public async verifyAllCheckboxesAreChecked(): Promise<void> {
    const checkboxCount: number = await this.checkboxes.count();

    for (let index = 0; index < checkboxCount; index += 1) {
      await this.webElementUtils.waitTillVisible(
        this.checkboxes.nth(index),
        ELEMENT_TIMEOUT,
      );
      await expect(this.checkboxes.nth(index)).toBeChecked();
    }
  }

  public async verifyTooltipIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.checkboxGroupTooltip,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTooltipIsClosed(): Promise<void> {
    const tooltipLocator: Locator = this.page.locator('[role="tooltip"]');
    const tooltipClass: string = await tooltipLocator.getAttribute('class');
    await expect(tooltipClass).toContain('csl-tooltip__tooltip--closed');
  }

  public async expandTooltip(): Promise<void> {
    await this.checkboxGroupTooltip.click();
  }

  public async verifyTooltipIsExpanded(): Promise<void> {
    const tooltipContent: Locator = this.page.locator(
      '[data-csl-selector="tooltip-content"]',
    );
    await this.webElementUtils.waitTillVisible(tooltipContent, ELEMENT_TIMEOUT);
  }
}
