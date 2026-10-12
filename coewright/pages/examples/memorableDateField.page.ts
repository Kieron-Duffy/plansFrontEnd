import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class MemorableDateFieldPage extends InterStellarBasePage {
  private readonly memorableDateContainer: Locator = this.page.locator(
    '.csl-memorable-date',
  );

  private readonly dayInput: Locator = this.memorableDateContainer.locator(
    '#memorable-date-field-day',
  );

  private readonly monthInput: Locator = this.memorableDateContainer.locator(
    '#memorable-date-field-month',
  );

  private readonly yearInput: Locator = this.memorableDateContainer.locator(
    '#memorable-date-field-year',
  );

  private readonly fieldLabel: Locator =
    this.memorableDateContainer.locator('legend');

  private readonly supportiveText: Locator =
    this.memorableDateContainer.locator('.csl-memorable-date__supportive-text');

  private readonly dayLabel: Locator = this.memorableDateContainer.locator(
    'label[for="memorable-date-field-day"]',
  );

  private readonly monthLabel: Locator = this.memorableDateContainer.locator(
    'label[for="memorable-date-field-month"]',
  );

  private readonly yearLabel: Locator = this.memorableDateContainer.locator(
    'label[for="memorable-date-field-year"]',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-forms-memorabledate--default&viewMode=story`,
    );
  }

  public async enterDay(day: number): Promise<void> {
    await this.dayInput.fill(day.toString());
  }

  public async enterMonth(month: number): Promise<void> {
    await this.monthInput.fill(month.toString());
  }

  public async enterYear(year: number): Promise<void> {
    await this.yearInput.fill(year.toString());
  }

  public async verifyMemorableDateIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.memorableDateContainer,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyLabelText(): Promise<void> {
    await expect(this.fieldLabel).toHaveText('Example label');
  }

  public async verifySupportiveText(): Promise<void> {
    await expect(this.supportiveText).toHaveText('Example supportive text');
  }

  public async verifyDayLabelText(): Promise<void> {
    await expect(this.dayLabel).toHaveText('Day');
  }

  public async verifyMonthLabelText(): Promise<void> {
    await expect(this.monthLabel).toHaveText('Month');
  }

  public async verifyYearLabelText(): Promise<void> {
    await expect(this.yearLabel).toHaveText('Year');
  }

  public async verifyDayValue(expectedValue: string): Promise<void> {
    await expect(this.dayInput).toHaveValue(expectedValue);
  }

  public async verifyMonthValue(expectedValue: string): Promise<void> {
    await expect(this.monthInput).toHaveValue(expectedValue);
  }

  public async verifyYearValue(expectedValue: string): Promise<void> {
    await expect(this.yearInput).toHaveValue(expectedValue);
  }
}
