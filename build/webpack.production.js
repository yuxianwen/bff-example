const CopyPlugin = require("copy-webpack-plugin");
const minify = require("html-minifier").minify;
const path = require("path");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  output: {
    filename: "[name].[contenthash].js"
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../src/web/views/layouts"),
          to: "../views/layouts",
          transform(content) {
            return minify(content.toString(), { collapseWhitespace: true });
          }
        },
        {
          from: path.join(__dirname, "../src/web/components"),
          to: "../components",
          transform(content) {
            return minify(content.toString(), { collapseWhitespace: true });
          }
        }
      ]
    })
  ]
};
