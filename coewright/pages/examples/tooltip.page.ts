import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class TooltipPage extends InterStellarBasePage {
  private readonly tooltipContainer: Locator =
    this.page.locator('#storybook-root');

  private readonly tooltipButton: Locator = this.tooltipContainer.locator(
    '[data-csl-selector="tooltip-target"]',
  );

  private readonly tooltipContent: Locator = this.tooltipContainer.locator(
    '[data-csl-selector="tooltip-content"] .csl-tooltip__children-container',
  );

  private readonly tooltipClose: Locator = this.tooltipContainer.locator(
    '[data-csl-selector="tooltip-close"]',
  );

  private readonly tooltipText: Locator =
    this.tooltipButton.locator('.csl-tooltip__text');

  private readonly tooltipTitle: Locator = this.tooltipContent.locator('h3');

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-notifications-tooltip--default&viewMode=story`,
    );
  }

  public async verifyTooltipIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.tooltipContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async expandTooltip(): Promise<void> {
    await this.tooltipButton.click();
  }

  public async closeTooltip(): Promise<void> {
    await this.tooltipClose.click();
  }

  public async verifyTooltipIsExpanded(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.tooltipContent,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTooltipIsClosed(): Promise<void> {
    await expect(this.tooltipContent).toBeHidden();
  }

  public async verifyTooltipTextIsCorrect(): Promise<void> {
    await expect(this.tooltipText).toHaveText(
      'What if I dont have a passport?',
    );
  }

  public async verifyTooltipContentIsCorrect(): Promise<void> {
    await expect(this.tooltipContent).toContainText(
      'Lorem ipsum dolor sit amet',
    );
  }

  public async verifyTooltipTitleIsCorrect(): Promise<void> {
    await expect(this.tooltipTitle).toHaveText('Example tooltip');
  }
}
