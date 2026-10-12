export default {
  // You can use this to store test data like page content or locators. For example:
  SDKContainerMessage:
    'A software development kit (SDK) for building web apps tailored to Lloyds Bank',
  ourMission: 'Our Mission',
  problemHeading: 'Problem loading page',
  footerLocator: 'footer-container',
  headerLocator: 'header-container',
  playgroundButtonLocator: 'MainPage-sdk-hero-button-idp',
  sdkContainerHeading: {
    locator: 'MainPage-sdk-hero-sub-heading',
    copy: 'A software development kit (SDK) for building web apps tailored to Lloyds Bank',
  },
  constellationHeading: {
    copy: "Built using the Group's own Design System, Constellation",
    locator: 'MainPage-constellation-hero-sub-heading',
  },
  coewrightHero: {
    logoLocator: '[data-qa-id="content-container-promobox-5-img"]',
    copyLocator: '[data-qa-id="content-container-promobox-5-desc"]',
    copy: 'Automate Web Applications Testing. InterStellar now ships with CoEWright, the bank approved test framework based on Playwright, delivered by the QECOE.',
  },
  noJS: {
    heading: 'You need Javascript enabled to view this page',
    links: {
      chrome: {
        copy: 'Chrome',
      },
      edge: {
        copy: 'Edge',
      },
      safari: {
        copy: 'Safari',
      },
      firefox: {
        copy: 'Firefox',
      },
      opera: {
        copy: 'Opera',
      },
    },
  },
  webview: {
    headingCopy: 'WebView (JSBridge) Demo',
    iosButton: 'isIos-button-test-id',
  },
};
