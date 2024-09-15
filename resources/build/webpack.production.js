/**
 * External dependencies.
 */
const { resolve } = require('path');
const webpack = require('webpack');

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
};
