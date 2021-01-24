const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
// const CopyPlugin = require('copy-webpack-plugin');

const outputDir = path.join(__dirname, 'build/');
const env = process.env.NODE_ENV || 'development';
const { ifProduction, ifDevelopment } = getIfUtils(env);

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  mode: ifProduction('production', 'development'),
  bail: true,
  target: 'web',
  output: {
    path: outputDir,
    publicPath: '/',
    filename: ifProduction('[name].[chunkhash:8].js', '[name].js'),
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src/'),
        test: /\.(js|tsx?)$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: removeEmpty([
    ifDevelopment(new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    })),
    ifProduction(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        outputDir,
      ],
    })),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackAssetsManifest({
      output: 'manifest.json',
      writeToDisk: true,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'src/public', // Omit `to` so that it ends up in root of build/
    //     },
    //   ]
    // }),
  ]),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    compress: true,
    contentBase: outputDir,
    port: process.env.PORT,
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/notebook': {
        // target: 'http://127.0.0.1:4010',
        // pathRewrite: {
        //   "^/notebook": ""
        // },
        target: "https://di7.blanktech.net",
        headers: {
          // Authorization: "Bearer abcd"
          Authorization: `Bearer ${process.env.API_TOKEN}`
        },
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      },
    },
  },
};
