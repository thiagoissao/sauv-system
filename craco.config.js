const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#01BFF3',
              '@border-radius': '8px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
