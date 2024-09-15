/**
 * External dependencies.
 */
const url = require('whatwg-url');
const get = require('lodash/get');
const { resolve } = require('path');
const webpack = require('webpack');

/**
 * Internal dependencies.
 */
const utils = require('./lib/utils');

/**
 * Environment.
 */
const env = utils.detectEnv();
const userConfig = utils.getUserConfig();
const devPort = get(userConfig, 'development.port', 3000);
const devHotUrl = url.parseURL(get(userConfig, 'development.hotUrl', 'http://localhost/').replace(/\/$/, ''));
const hotUrl = `${devHotUrl.scheme}://${devHotUrl.host}:${devPort}/`;

/** @type {webpack.Configuration} */
module.exports = {
  /**
   * Extending multiple webpack configurations.
   *
   * 1. The `@wordpress/scripts` webpack configuration.
   * 2. The base configuration for our projet, it should override
   * the `@wordpress/scripts` webpack configuration.
   */
  extends: [
    require.resolve('@wordpress/scripts/config/webpack.config'),
    resolve(__dirname, './webpack.base.js'),
  ],

  output: {
    publicPath: env.isHot ? hotUrl : ''
  },

  devServer: {
    allowedHosts: 'all',
    hot: true,
    host: devHotUrl.host,
    port: devPort,
    client: {
      overlay: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/dist': {
        pathRewrite: {
          '^/dist': '',
        },
      },
    },
    watchFiles: [
      './views/**/*.php',
      './*.php',
    ],
  }
};
