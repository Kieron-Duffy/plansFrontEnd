import { test, Locator } from '@playwright/test';

import { InterStellarBasePage } from './basePage';
import interstellarAppData from '../data/interstellar-app.copytext';

export class InterstellarAboutUsPage extends InterStellarBasePage {
  ourMissionHeading: Locator = this.page.getByRole('heading', {
    name: interstellarAppData.ourMission,
  });

  constellationHeading: Locator = this.page.getByRole('heading', {
    name: "Built using the Group's own Design System, Constellation",
  });

  homeLink: Locator = this.page.getByRole('link', {
    name: 'Home',
    exact: true,
  });

  public async launchStarterKitAboutUsPage() {
    await this.page.goto(`${process.env.BASE_URL}about-us`);
  }

  public async ourMissionHeadingIsDisplayed() {
    await test.step(`Checking the Our Mission header is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.ourMissionHeading,
        ELEMENT_TIMEOUT,
      );
    });
  }

  public async clickHomeLink() {
    await test.step(`Click on the about us link`, async () => {
      await this.homeLink.click();
    });
  }
}
