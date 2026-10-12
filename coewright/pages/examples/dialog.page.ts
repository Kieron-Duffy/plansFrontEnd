import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class DialogPage extends InterStellarBasePage {
  private readonly dialogElement: Locator = this.page.locator(
    '.csl-dialog__dialog',
  );

  private readonly dialogTrigger: Locator = this.page
    .locator('.csl-button')
    .first();

  private readonly dialogTitle: Locator =
    this.dialogElement.locator('.csl-dialog__title');

  private readonly dialogParagraph: Locator =
    this.dialogElement.locator('p.csl-text-s2');

  private readonly primaryButton: Locator = this.dialogElement.locator(
    '.csl-button--primary',
  );

  private readonly secondaryButton: Locator = this.dialogElement.locator(
    '.csl-button--secondary',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-content-dialog--default&viewMode=story`,
    );
  }

  public async openDialog(): Promise<void> {
    await this.dialogTrigger.click();
  }

  public async verifyDialogIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.dialogElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyDialogTitleIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.dialogTitle,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyDialogParagraphIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.dialogParagraph,
      ELEMENT_TIMEOUT,
    );
  }

  public async clickPrimaryButton(): Promise<void> {
    await this.primaryButton.click();
  }

  public async verifyPrimaryButtonText(expectedText: string): Promise<void> {
    await expect(this.primaryButton).toHaveText(expectedText);
  }

  public async clickSecondaryButton(): Promise<void> {
    await this.secondaryButton.click();
  }

  public async verifySecondaryButtonText(expectedText: string): Promise<void> {
    await expect(this.secondaryButton).toHaveText(expectedText);
  }
}
