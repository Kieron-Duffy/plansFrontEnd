import { test } from '../base-test';

test.describe('Accordion Component', () => {
  test.beforeEach(async ({ accordionPage }) => {
    await accordionPage.open();
  });

  test('Accordion displayed correctly', async ({ accordionPage }) => {
    await test.step('Verify first expandable text is correct', async () => {
      await accordionPage.verifyExpandableText(0, 'Need help?');
    });

    await test.step('Verify second expandable text is correct', async () => {
      await accordionPage.verifyExpandableText(1, 'Need help?');
    });
  });

  test('Accordion can expand', async ({ accordionPage }) => {
    await test.step('Expand the first component of the accordion', async () => {
      await accordionPage.expandExpandable(0);
    });

    await test.step('Verify first component is expanded', async () => {
      await accordionPage.verifyExpandableIsExpanded(0);
    });

    await test.step('Verify second component is collapsed', async () => {
      await accordionPage.verifyExpandableIsCollapsed(1);
    });
  });

  test('Accordion can collapse', async ({ accordionPage }) => {
    await test.step('Expand the first component of the accordion', async () => {
      await accordionPage.expandExpandable(0);
    });

    await test.step('Collapse the first component of the accordion', async () => {
      await accordionPage.collapseExpandable(0);
    });

    await test.step('Verify first component is collapsed', async () => {
      await accordionPage.verifyExpandableIsCollapsed(0);
    });
  });
});
