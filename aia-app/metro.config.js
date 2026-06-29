const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// SVG files in assets/ are image assets — let expo-image handle them normally.
// Do NOT move svg to sourceExts; leave them in assetExts so require() works.

module.exports = config;
