const extendDevConfig = (originalWebpackConfig) => ({
  ...originalWebpackConfig,
  devServer: {
    ...originalWebpackConfig.devServer,
    proxy: [
      {
        context: ['/consumer-relationship'],
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
    ],
  },
});

module.exports = extendDevConfig;
