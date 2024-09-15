/**
 * The internal dependencies.
 */
const utils = require('../lib/utils');
const keyBy = require('lodash/keyBy');
const mapValues = require('lodash/mapValues');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils');
const getEntryPoints = getWebpackEntryPoints('script');

module.exports = {
  ...getEntryPoints(),
  ...mapValues(
    keyBy(utils.getUserConfig().bundles, bundle => bundle),
    bundle => utils.srcScriptsPath(`${bundle}/index.js`)
  ),
};
