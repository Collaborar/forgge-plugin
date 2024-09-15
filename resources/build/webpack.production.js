/**
 * External dependencies.
 */
// const url = require('whatwg-url');
// const get = require('lodash/get');
const { resolve } = require('path');
const webpack = require('webpack');

/**
 * Internal dependencies.
 */
// const utils = require('./lib/utils');

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

  // output: {
  //   publicPath: env.isHot ? hotUrl : ''
  // },
};
