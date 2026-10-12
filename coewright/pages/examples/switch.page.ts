import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class SwitchPage extends InterStellarBasePage {
  private readonly switchContainer: Locator = this.page.locator(
    '.csl-selector__container',
  );

  private readonly switchLabel: Locator = this.switchContainer.locator(
    '[data-csl-selector="field-label"]',
  );

  private readonly switchTooltip: Locator = this.switchContainer.locator(
    '[data-csl-selector="tooltip-target"]',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-switch--default&viewMode=story`,
    );
  }

  public async verifySwitchIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.switchContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifySwitchLabelIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.switchLabel,
      ELEMENT_TIMEOUT,
    );
  }

  public async selectOptionByText(text: string): Promise<void> {
    const option: Locator = this.switchContainer.getByText(text, {
      exact: true,
    });
    await option.click();
  }

  public async verifyOptionIsSelected(text: string): Promise<void> {
    const radioInput: Locator = this.switchContainer.getByRole('radio', {
      name: text,
      exact: true,
    });
    await this.webElementUtils.waitTillVisible(radioInput, ELEMENT_TIMEOUT);
    await expect(radioInput).toBeChecked();
  }

  public async verifyOptionIsNotSelected(text: string): Promise<void> {
    const radioInput: Locator = this.switchContainer.getByRole('radio', {
      name: text,
      exact: true,
    });
    await expect(radioInput).not.toBeChecked();
  }

  public async verifyTooltipIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.switchTooltip,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTooltipIsClosed(): Promise<void> {
    const tooltipLocator: Locator = this.page.locator('[role="tooltip"]');
    const tooltipClass: string = await tooltipLocator.getAttribute('class');
    await expect(tooltipClass).toContain('csl-tooltip__tooltip--closed');
  }

  public async expandTooltip(): Promise<void> {
    await this.switchTooltip.click();
  }

  public async verifyTooltipIsExpanded(): Promise<void> {
    const tooltipContent: Locator = this.page.locator(
      '[data-csl-selector="tooltip-content"]',
    );
    await this.webElementUtils.waitTillVisible(tooltipContent, ELEMENT_TIMEOUT);
  }

  public async verifyTooltipContent(): Promise<void> {
    const tooltipContent: Locator =
      this.switchTooltip.locator('[role="tooltip"]');
    await expect(tooltipContent).not.toBeEmpty();
  }
}
