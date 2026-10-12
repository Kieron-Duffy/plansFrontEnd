import { expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from '../basePage';

export class NotificationPage extends InterStellarBasePage {
  private readonly informationNotification: Locator = this.page.locator(
    '.csl-notification--information',
  );

  private readonly warningNotification: Locator = this.page.locator(
    '.csl-notification--warning',
  );

  private readonly criticalNotification: Locator = this.page.locator(
    '.csl-notification--critical',
  );

  private readonly successNotification: Locator = this.page.locator(
    '.csl-notification--success',
  );

  private readonly notificationElement: Locator = this.page.locator(
    '.csl-notification--information',
  );

  private readonly notificationBody: Locator = this.notificationElement.locator(
    '.csl-notification__body',
  );

  public async open(): Promise<void> {
    await this.page.goto(
      `${process.env.BASE_URL}iframe?args=&id=components-notifications-notification--default&viewMode=story`,
    );
  }

  public async verifyNotificationIsVisible(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.notificationElement,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyInformationNotificationIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.informationNotification,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyWarningNotificationIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.warningNotification,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyCriticalNotificationIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.criticalNotification,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifySuccessNotificationIsDisplayed(): Promise<void> {
    await this.webElementUtils.waitTillVisible(
      this.successNotification,
      ELEMENT_TIMEOUT,
    );
  }

  public async verifyInformationNotificationContent(): Promise<void> {
    await expect(this.notificationBody).toHaveText(
      'Lorem ipsum dolor I am a link ipsum dolor.',
    );
  }
}
