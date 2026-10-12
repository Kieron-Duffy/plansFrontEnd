import interstellarConfig from './interstellar.playwright.config';

const config = {
  ...interstellarConfig,
  testDir: '../tests/examples',
  projects: [
    {
      name: 'local',
    },
  ],
};

export default config;
