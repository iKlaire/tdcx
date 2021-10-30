const { override, fixBabelImports, addBabelPreset, addLessLoader, addWebpackResolve } = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      importLoaders: true,
      modifyVars: {
        // Colors
        '@primary-color': '#231F20',
        '@success-color': '#52C41A',
        '@error-color': '#F5222D',
        '@text-color': '#231F20',
        '@secondary-color': '#E8ECEC',
        '@secondary-1': 'color(~`colorPalette("@{secondary-color}", 1)`)',
        '@link-color': '@primary-color',

        // Font
        '@font-family': `'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Calibri', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', sans-serif`,

        // Table
        '@table-row-hover-bg': '@secondary-1',

        // Button
        '@btn-border-radius-base': '3px',
        '@btn-height-base': '40px',
        '@btn-primary-color': '@primary-color',
        '@btn-primary-bg': '@primary-color',

        // Form
        '@form-item-margin-bottom': '32px',

        // Input
        '@input-height-base': '40px',

        // Base
        '@border-radius-base': '4px',

        // Tabs
        '@tabs-horizontal-margin': '0 56px 0 0',
        '@tabs-vertical-margin': '0 0 56px 0',

        // Menu
        '@menu-item-active-bg': '@secondary-color',
        '@menu-highlight-color': '@primary-color',

        // Select
        '@select-item-selected-bg': '@secondary-color'
      }
    }
  }),

  addWebpackResolve({
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  })
);
