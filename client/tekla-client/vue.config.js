// vue.config.js file to be placed in the root of your repository

module.exports = {
    devServer: {
        compress: true,
        host: '0.0.0.0',
        hotOnly: true,
        index: 'index.html',
        liveReload: true,
        port: 9000,


    },
    publicPath: process.env.NODE_ENV === 'production'
      ? '/site-app/'
      : '/',
    outputDir: '../apps'
  }
  