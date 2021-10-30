const CracoAntDesignPlugin = require('craco-antd');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: './config/antd.customize.less'
      }
    }
  ],
  webpack: {
    configure: {
      resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      }
    }
  }
};
