module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['module:metro-react-native-babel-preset', {
      unstable_disableES6Transforms: true
    }]],
    plugins: ["tailwindcss-react-native/babel"],
  };
};
