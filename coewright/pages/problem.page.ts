import { test, Locator } from '@playwright/test';

import { InterStellarBasePage } from './basePage';
import interstellarAppData from '../data/interstellar-app.copytext';

export class InterstellarProblemPage extends InterStellarBasePage {
  problemHeading: Locator = this.page.getByRole('heading', {
    name: interstellarAppData.problemHeading,
  });

  homeLink: Locator = this.page.getByRole('link', {
    name: 'Home',
    exact: true,
  });

  public async launchStarterKitWithNonExistingSubPath() {
    await this.page.goto(`${process.env.BASE_URL}non/existing/sub_path`);
  }

  public async problemHeadingIsDisplayed() {
    await test.step(`Checking the Our Mission header is displayed`, async () => {
      await this.webElementUtils.waitTillVisible(
        this.problemHeading,
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
