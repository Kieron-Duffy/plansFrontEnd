const extendJestConfig = (originalJestConfig) => {
  const jestConfig = {
    ...originalJestConfig,
  };
  return jestConfig;
};

module.exports = extendJestConfig;
