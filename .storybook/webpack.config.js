module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(js|tsx?)$/,
    loader: 'babel-loader',
  },);
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
