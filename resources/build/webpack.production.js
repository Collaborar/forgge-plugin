/**
 * External dependencies.
 */
const { resolve } = require('path');
const webpack = require('webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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

  optimization: {
    minimizer: [
      '...',
      /**
       * Image minimizer.
       * Optmize and compress all images using `imagemin`. You can change
       * these settings by visiting the configuration page on the link below.
       *
       * @see https://webpack.js.org/plugins/image-minimizer-webpack-plugin
       */
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you.
            plugins: [
              ['gifsicle', { optimizationLevel: 3 }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 7 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
