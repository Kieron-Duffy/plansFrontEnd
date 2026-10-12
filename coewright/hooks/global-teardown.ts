import { globalTestData } from '@qecoe/playwright_automation';

import { isApplitoolsRunEnabled } from '../utils/applitools';

const APPLITOOLS_RESULTS_URL =
  'https://lbgeyes.applitools.com/app/test-results/00000251619569420073/?accountId=m0xSOuJ2AEeifAZkPzHhQw__';

/**
 * Purpose: Global TearDown method- Which helps to setup the after test execution
 * clean up or dispose methods or storing of logs.
 *
 * @param - None
 *
 * @returns None
 *
 */
async function globalTearDown() {
  if (isApplitoolsRunEnabled()) {
    const bannerLines = [
      '',
      '============================================================',
      '                    APPLITOOLS RESULTS                       ',
      APPLITOOLS_RESULTS_URL,
      '============================================================',
      '',
    ];
    process.stdout.write(`${bannerLines.join('\n')}\n`);
  }

  await globalTestData.cleardata();
}

export default globalTearDown;
