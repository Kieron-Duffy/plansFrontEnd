import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class IconPage extends InterStellarBasePage {
  private readonly storyRoot: Locator = this.page.locator('#storybook-root');

  private readonly iconElement: Locator = this.storyRoot.locator('svg').first();

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?id=tests-icon--all-variations&viewMode=story`,
    );
  }

  public async verifyIconIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.iconElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyIconDimensions(): Promise<void> {
    await expect(this.iconElement).toHaveAttribute('width', '24');
    await expect(this.iconElement).toHaveAttribute('height', '24');
  }
}
