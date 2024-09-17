/**
 * External dependencies.
 */
const { resolve } = require('path');
const { ProvidePlugin } = require('webpack');
const {
  WebpackManifestPlugin: ManifestPlugin,
} = require('webpack-manifest-plugin');

/**
 * Internal dependencies.
 */
const utils = require('./lib/utils');
const spriteSvg = require('./spritesvg');
const configLoader = require('./config-loader');
const DevelopmentModePlugin = require('./lib/development-mode-plugin');

const env = utils.detectEnv();

/**
 * Setup webpack plugins.
 */
const plugins = [
  new ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  spriteSvg,
  new ManifestPlugin({
    writeToDisk: true,
  }),
  new DevelopmentModePlugin({ hot: env.isHot }),
];

module.exports = {
  /**
   * The input.
   */
  entry: require('./webpack/entry'),

  /**
   * The output.
   */
  output: {
    path: resolve(process.cwd(), 'dist')
  },

  /**
   * Resolve utilities.
   */
  resolve: require('./webpack/resolve'),

  /**
   * Resolve the dependencies that are available in the global scope.
   */
  externals: require('./webpack/externals'),

  /**
   * Setup the transformations.
   */
  module: {
    rules: [
      /**
       * Add support for blogs in import statements.
       */
      {
        enforce: 'pre',
        test: /\.(js|jsx|css|scss|sass)$/,
        use: 'import-glob',
      },

      /**
       * Handle config.json.
       */
      {
        type: 'javascript/auto',
        test: utils.rootPath('config.json'),
        use: configLoader,
      },

      /**
       * Handle SVG sprites.
       */
      {
        test: utils.tests.svgs,
        include: [
          utils.srcImagesPath('sprite-svg'),
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: env.isProduction,
              spriteFileName: 'sprite.svg'
            },
          },
        ],
      },
    ],
  },

  /**
   * Setup the transformations.
   */
  plugins,
};
