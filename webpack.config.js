const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const dev = process.env.NODE_ENV != 'production';

const ExtractTextPluginIndexConfig = new ExtractTextPlugin({
  disable: false,
  filename: './css/styles.bundle.css',
  allChunks: true
});

const HtmlWebpackPluginIndexConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

/* 
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: './src/videos', to: 'videos' },
  { from: './src/json', to: 'json' }
]); */


const modules = {
  loaders: [
    { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    {test: /\.(sa|sc|c)ss$/,
        use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
          use: [
            "babel-loader",
            {
              loader: 'css-loader',
              options: {
                url: true,
                minimize: !dev,
                sourceMap: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')({
                    /* options */
                  })
                ]
              }
            },
            {
              loader:'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }))
    },
    { test: /\.(gif|jpg|png)$/, loader: 'file-loader?limit=100000', exclude: /(node_modules|sass_svg)/, options: { outputPath: './images/' } },
    { test: /\.(woff|woff2|eot|ttf)$/, loader: 'file-loader?limit=100000', options: { outputPath: './fonts/' } },
    { test: /\.(svg)$/i, loader: 'svg-url-loader', include: /sass_svg/ },

    { test: /\.(svg|html)$/i, loader: 'html-loader', exclude: /node_modules|sass_svg/ },

  ]
};

module.exports = //[
  {
  name: 'index',
  entry: ['react-hot-loader/patch','./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/index.bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: modules,
  plugins: [ExtractTextPluginIndexConfig, HtmlWebpackPluginIndexConfig, new webpack.HotModuleReplacementPlugin()]

}
//]