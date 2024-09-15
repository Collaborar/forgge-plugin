/**
 * WordPress dependencies.
 */
const postcssPlugins = require( '@wordpress/postcss-plugins-preset' );

/**
 * Internal dependencies.
 */
const utils = require('./resources/build/lib/utils');

const env = utils.detectEnv();

/**
 * Setup PostCSS plugins.
 */
const plugins = [
  /* @preset-begin(Tailwind CSS)
  require('tailwindcss')(utils.srcPath('build/tailwindcss.js')),
  @preset-end(Tailwind CSS) */
  ...postcssPlugins,
];

if (env.isProduction && !env.isDebug) {
  plugins.push(
    require('postcss-import'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        }
      ]
    }),
  );
}

/**
 * Prepare the configuration.
 */
const config = {
  ident: 'postcss',
  sourceMap: !env.isProduction,
  plugins,
};

module.exports = config;
