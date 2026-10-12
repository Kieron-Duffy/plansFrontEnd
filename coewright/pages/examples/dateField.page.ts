import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class DateFieldPage extends InterStellarBasePage {
  private readonly dateFieldContainer: Locator =
    this.page.locator('.csl-date-field');

  private readonly dayInput: Locator =
    this.dateFieldContainer.locator('#date-field-day');

  private readonly monthSelect: Locator =
    this.dateFieldContainer.locator('#date-field-month');

  private readonly yearInput: Locator =
    this.dateFieldContainer.locator('#date-field-year');

  private readonly fieldLabel: Locator =
    this.dateFieldContainer.locator('legend');

  private readonly supportiveText: Locator = this.dateFieldContainer.locator(
    '.csl-date-field__supportive-text',
  );

  private readonly tooltip: Locator = this.dateFieldContainer.locator(
    '.csl-tooltip__inner',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-datefield--default&viewMode=story`,
    );
  }

  public async enterDay(day: number): Promise<void> {
    await this.dayInput.fill(day.toString());
  }

  public async enterMonthByName(month: string): Promise<void> {
    await this.monthSelect.selectOption({ label: month });
  }

  public async enterYear(year: number): Promise<void> {
    await this.yearInput.fill(year.toString());
  }

  public async verifyDateFieldIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.dateFieldContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyLabelText(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.fieldLabel,
      ELEMENT_TIMEOUT,
    );
    await expect(this.fieldLabel).toHaveText('Example label');
  }

  public async verifySupportiveText(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.supportiveText,
      ELEMENT_TIMEOUT,
    );
    await expect(this.supportiveText).toHaveText('Example supportive text');
  }

  public async verifyTooltipText(): Promise<void> {
    await this.webElementUtils.waitTillVisible(this.tooltip, ELEMENT_TIMEOUT);
    await expect(this.tooltip).toHaveText(
      'You must be 18 years old to continue',
    );
  }

  public async verifyDayInputIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(this.dayInput, ELEMENT_TIMEOUT);
  }

  public async verifyDayValue(expectedValue: string): Promise<void> {
    await expect(this.dayInput).toHaveValue(expectedValue);
  }

  public async verifyMonthValue(expectedValue: string): Promise<void> {
    await expect(this.monthSelect).toHaveValue(expectedValue);
  }

  public async verifyYearValue(expectedValue: string): Promise<void> {
    await expect(this.yearInput).toHaveValue(expectedValue);
  }
}
