const extendJestConfig = (originalJestConfig) => {
  const jestConfig = {
    ...originalJestConfig,
    testMatch: [
      ...originalJestConfig.testMatch,
      '<rootDir>/bdd/src/test/stepDefs/**/*.{test,spec}.{ts,tsx}',
    ],
  };
  return jestConfig;
};

module.exports = extendJestConfig;
