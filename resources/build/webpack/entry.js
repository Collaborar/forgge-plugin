/**
 * External dependencies.
 */
const keyBy = require('lodash/keyBy');
const mapValues = require('lodash/mapValues');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils');

/**
 * Internal dependencies.
 */
const utils = require('../lib/utils');

const getEntryPoints = getWebpackEntryPoints('script');

module.exports = {
  ...getEntryPoints(),
  ...mapValues(
    keyBy(utils.getUserConfig().bundles, bundle => bundle),
    bundle => utils.resourcesScriptsPath(`${bundle}/index.js`)
  ),
};
