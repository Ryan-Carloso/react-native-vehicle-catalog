const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watchFolders = [...config.watchFolders, path.resolve(__dirname, '..')];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'),
  path.resolve(__dirname, '../../node_modules'),
];

config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'json', 'lottie'];

config.resolver.alias = {
  '@': path.resolve(__dirname, '.'),
  '@/assets': path.resolve(__dirname, 'assets'),
  '@/src': path.resolve(__dirname, 'src'),
  '@shared': path.resolve(__dirname, '../shared'),
};

module.exports = config;
