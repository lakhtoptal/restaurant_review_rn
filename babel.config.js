const alias = { '^@/(.+)': './src/\\1' }; // @/folder will be an alias to <root>/src/folder
const extensions = ['.android.js', '.ios.js', '.js', '.json', '.native'];

const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
  ['module-resolver', { alias, extensions }],
  [
    'dotenv-import',
    {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: false,
    },
  ],
];

module.exports = { presets, plugins };
