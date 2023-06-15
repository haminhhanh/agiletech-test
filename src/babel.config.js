module.exports = {
  plugins: [
    [
      {
        moduleName: '@env',
      },
    ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          '@shopDunk': './src',
        },
      },
    ],
    'jest-hoist',
  ],
};
