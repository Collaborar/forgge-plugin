/**
 * Internal dependencies.
 */
const utils = require('../lib/utils');

const extensions = ['.js', '.jsx', '.json', '.css', '.scss'];

module.exports = {
  modules: [utils.resourcesScriptsPath(), 'node_modules'],
  alias: {
    '@config': utils.rootPath('config.json'),
    '@scripts': utils.resourcesScriptsPath(),
    '@styles': utils.resourcesStylesPath(),
    '@images': utils.resourcesImagesPath(),
    '@fonts': utils.resourcesFontsPath(),
    '@vendor': utils.resourcesVendorPath(),
    '@dist': utils.distPath(),
    '~': utils.rootPath('node_modules'),
    'isotope': 'isotope-layout',
    'masonry': 'masonry-layout',
    'jquery-ui': 'jquery-ui-dist/jquery-ui.js',
  },
  extensions,
};
