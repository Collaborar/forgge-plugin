/**
 * The external dependencies.
 */
const fs = require('fs');
const path = require('path');
const pick = require('lodash/pick');
const { hasArgInCLI } = require('@wordpress/scripts/utils');

/**
 * User config cache.
 */
let userConfig = null;

/**
 * API.
 */
module.exports.rootPath = (basePath = '', destPath = '') =>
  path.resolve(path.dirname(__dirname), '../../', basePath, destPath);

module.exports.resourcesPath = (basePath = '', destPath = '') =>
  path.resolve(path.dirname(__dirname), '../', basePath, destPath);

module.exports.srcPath = (basePath = '', destPath = '') =>
  path.resolve(path.dirname(__dirname), '../../src', basePath, destPath);

module.exports.distPath = (basePath = '', destPath = '') =>
  path.resolve(path.dirname(__dirname), '../../dist', basePath, destPath);

module.exports.resourcesScriptsPath = destPath =>
  exports.resourcesPath('scripts', destPath);

module.exports.resourcesStylesPath = destPath =>
  exports.resourcesPath('styles', destPath);

module.exports.resourcesImagesPath = destPath =>
  exports.resourcesPath('images', destPath);

module.exports.resourcesFontsPath = destPath =>
  exports.resourcesPath('fonts', destPath);

module.exports.resourcesVendorPath = destPath =>
  exports.resourcesPath('vendor', destPath);

module.exports.distScriptsPath = destPath =>
  exports.distPath('scripts', destPath);

module.exports.distStylesPath = destPath =>
  exports.distPath('styles', destPath);

module.exports.distImagesPath = destPath =>
  exports.distPath('images', destPath);

module.exports.distFontsPath = destPath =>
  exports.distPath('fonts', destPath);

module.exports.tests = {
  scripts: /\.(js|jsx)$/,
  styles: /\.(css|scss|sass)$/,
  svgs: /\.svg$/,
  images: /\.(ico|jpg|jpeg|png|svg|gif)$/,
  fonts: /\.(eot|ttf|woff|woff2)$/,
};

module.exports.detectEnv = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const forggeEnv = process.env.FORGGE_ENV || '';
  const isCombined = !!process.env.FORGGE_COMBINED_BUILD;
  const isDevelopment = nodeEnv === 'development';
  const isHot = hasArgInCLI('--hot');
  const isProduction = nodeEnv === 'production';
  const isDebug = forggeEnv === 'debug';

  return {
    isCombined,
    isDevelopment,
    isHot,
    isProduction,
    isDebug,
    filenameSuffix: isProduction && !isDebug ? '.min' : '',
  };
};

module.exports.getWhitelistedUserConfig = (config) => {
  const whitelist = config.release.configWhitelist || [];
  return pick(config, whitelist);
};

module.exports.getUserConfig = (file, whitelisted = false) => {
  const userConfigPath = file || path.join(process.cwd(), 'config.json');

  if (userConfig !== null) {
    return userConfig;
  }

  if (!fs.existsSync(userConfigPath)) {
    console.error('\x1B[31mCould not find your config.json file. Please make a copy of config.json.dist and adjust as needed.\x1B[0m');
    process.exit(1);
  }

  try {
    userConfig = JSON.parse(fs.readFileSync(userConfigPath));
  } catch (e) {
    console.error('\x1B[31mCould not parse your config.json file. Please make sure it is a valid JSON file.\x1B[0m');
    process.exit(1);
  }

  if (whitelisted) {
    return module.exports.getWhitelistedUserConfig(userConfig);
  }

  return userConfig;
};

module.exports.assetFilename = (relativeTo = null) => (file) => {
  const resourcesDir = path.normalize(exports.resourcesPath()) + path.sep;
  const nodeModulesDir = path.normalize(path.join(exports.rootPath(), 'node_modules')) + path.sep;
  const isResourceFile = path.normalize(file).substr(0, resourcesDir.length) === resourcesDir;
  const isVendorFile = path.normalize(file).substr(0, nodeModulesDir.length) === nodeModulesDir;
  let filepath = '';

  if (isVendorFile) {
    filepath = 'vendor/';
  } else if (isResourceFile) {
    if (relativeTo !== null) {
      filepath = path.relative(relativeTo, path.dirname(file));
      filepath = filepath ? `${filepath}/` : '';
    }
  }

  return `${filepath}[name].[contenthash:10].[ext]`;
};
