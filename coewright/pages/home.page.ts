import { test, expect, Locator } from '@playwright/test';

import { InterStellarBasePage } from './basePage';
import interstellarAppData from '../data/interstellar-app.copytext';

export class InterstellarHomePage extends InterStellarBasePage {
  sdkContainerHeading: Locator = this.page.getByTestId(
    interstellarAppData.sdkContainerHeading.locator,
  );

  constellationHeading: Locator = this.page.getByTestId(
    interstellarAppData.constellationHeading.locator,
  );

  footer: Locator = this.page.getByTestId(interstellarAppData.footerLocator);

  playgroundButton: Locator = this.page.getByTestId(
    interstellarAppData.playgroundButtonLocator,
  );

  aboutUsLink: Locator = this.page.getByRole('link', {
    name: 'About Us',
    exact: true,
  });

  coewrightHeroLogoLocator: Locator = this.page.locator(
    interstellarAppData.coewrightHero.logoLocator,
  );

  coewrightHeroCopyLocator: Locator = this.page.locator(
    interstellarAppData.coewrightHero.copyLocator,
  );

  public async launchStarterKit() {
    await this.page.goto(process.env.BASE_URL);
  }

  public async sdkContainerHeadingIsDisplayed() {
    await test.step(`Checking the SDK header is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.sdkContainerHeading,
        ELEMENT_TIMEOUT,
      );
      await expect(this.sdkContainerHeading).toHaveText(
        interstellarAppData.SDKContainerMessage,
      );
    });
  }

  public async constellationHeadingIsDisplayed() {
    await test.step(`Checking the constellation header is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.constellationHeading,
        ELEMENT_TIMEOUT,
      );
      await expect(this.constellationHeading).toHaveText(
        interstellarAppData.constellationHeading.copy,
      );
    });
  }

  public async footerIsDisplayed() {
    await test.step(`Checking the footer is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(this.footer, ELEMENT_TIMEOUT);
    });
  }

  public async playgroundButtonsDisplayed() {
    await test.step(`Checking the playground button is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.playgroundButton,
        ELEMENT_TIMEOUT,
      );
    });
  }

  public async clickAboutUsLink() {
    await test.step(`Click on the about us link`, async () => {
      await this.aboutUsLink.click();
    });
  }

  public async coewrightHeroDisplayedCorrectly() {
    await test.step(`Coewright logo displayed correctly`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.coewrightHeroLogoLocator,
        ELEMENT_TIMEOUT,
      );
    });
    await test.step(`Coewright copy displayed correctly`, async () => {
      await expect(this.coewrightHeroCopyLocator).toHaveText(
        interstellarAppData.coewrightHero.copy,
      );
    });
  }
}
