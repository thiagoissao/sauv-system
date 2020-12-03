const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#03a9f4',
              '@border-radius': '8px',
              '@border-radius-base': '16px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
