const { argv } = require("yargs");
const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const AfterHtmlPlugin = require('./build/AfterHtmlPlugin')


var glob = require("glob");

console.log("当前环境:", argv.mode);

// 1.判断打包环境
// 2.打包js

const mode = argv.mode;

const files = glob.sync("./src/web/views/**/*.entry.js");
const entrys = {};
const htmlPlugins = [];

files.forEach(url => {
  if (/([a-zA-Z]+-[a-zA-Z]+)\.entry.js/.test(url)) {
    const entryKey = RegExp.$1;
    const [pageName, actionName] = entryKey.split("-");
    entrys[
      entryKey
    ] = `./src/web/views/${pageName}/${pageName}-${actionName}.entry.js`;
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${pageName}/pages/${actionName}.html`,
        template: `./src/web/views/${pageName}/pages/${actionName}.html`,
        chunks: ["runtime", entryKey],
        inject: false
      })
    );
  }
});

const envConfig = require(`./build/webpack.${mode}`);

const baseConfig = {
  mode,
  entry: entrys,
  output: {
    path: path.join(__dirname, "./dist/web/assets"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],

      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, './src/web/views/layouts'),to: "../views/layouts" },
        { from: path.join(__dirname, './src/web/components'), to: "../components" },
      ],
    }),
    new AfterHtmlPlugin()
  ]
};
// console.log(merge);

module.exports = merge(envConfig, baseConfig);
