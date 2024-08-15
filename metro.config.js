/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
