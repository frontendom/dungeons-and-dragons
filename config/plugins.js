const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const {ctx, DEV} = require('./common');

module.exports = [
  new LodashModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks({userRequest}) {
      return typeof userRequest === 'string' && userRequest.includes('node_modules');
    }
  }),
  new OfflinePlugin({
    publicPath: '/',
    AppCache: false
  }),
  new HtmlWebpackPlugin({
    title: 'Dungeons & Dragons',
    filename: 'index.html',
    template: `!!html-loader!${ctx}/app/index.html`,
    chunksSortMode: 'dependency',
    excludeChunks: ['data'],
    inject: true
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: !DEV
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new ExtractTextPlugin({
    allChunks: true,
    filename: 'styles-[name]-[contenthash].css',
    disable: DEV
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
];
