import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class GenderFieldPage extends InterStellarBasePage {
  private readonly genderFieldContainer: Locator =
    this.page.locator('.csl-field');

  private readonly genderFieldLabel: Locator =
    this.genderFieldContainer.locator('[data-csl-selector="field-label"]');

  private readonly genderFieldSupportiveText: Locator =
    this.genderFieldContainer.locator(
      '[data-csl-selector="field-supportive-text"]',
    );

  private readonly genderFieldTooltip: Locator =
    this.genderFieldContainer.locator('[data-csl-selector="tooltip-target"]');

  private readonly tooltipButton: Locator = this.genderFieldTooltip;

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-genderfield--default&viewMode=story`,
    );
  }

  public async selectOptionByText(text: string): Promise<void> {
    const option: Locator = this.genderFieldContainer.getByText(text, {
      exact: true,
    });
    await option.click();
  }

  public async verifyGenderFieldIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.genderFieldContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async expandTooltip(): Promise<void> {
    await this.tooltipButton.click();
  }

  public async verifyTooltipIsExpanded(): Promise<void> {
    const tooltipContent: Locator = this.page.locator(
      '[data-csl-selector="tooltip-content"]',
    );
    await this.webElementUtils.waitTillVisible(tooltipContent, ELEMENT_TIMEOUT);
  }

  public async verifyOptionIsSelected(text: string): Promise<void> {
    const radioInput: Locator = this.genderFieldContainer.getByRole('radio', {
      name: text,
      exact: true,
    });
    await this.webElementUtils.waitTillVisible(radioInput, ELEMENT_TIMEOUT);
    await expect(radioInput).toBeChecked();
  }

  public async verifyOptionIsNotSelected(text: string): Promise<void> {
    const radioInput: Locator = this.genderFieldContainer.getByRole('radio', {
      name: text,
      exact: true,
    });
    await expect(radioInput).not.toBeChecked();
  }

  public async verifyGenderFieldLabelIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.genderFieldLabel,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyGenderFieldSupportiveTextIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.genderFieldSupportiveText,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyGenderFieldTooltipIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.genderFieldTooltip,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyTooltipIsClosed(): Promise<void> {
    const tooltipContent: Locator =
      this.genderFieldTooltip.locator('[role="tooltip"]');
    await expect(tooltipContent).toBeHidden();
  }

  public async verifyTooltipContent(): Promise<void> {
    const tooltipContent: Locator = this.page.locator(
      '[data-csl-selector="tooltip-content"]',
    );
    await expect(tooltipContent).not.toBeEmpty();
  }
}
