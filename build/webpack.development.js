const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    watch: true,
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.join(__dirname, '../src/web/views/layouts'),to: "../views/layouts" },
            { from: path.join(__dirname, '../src/web/components'), to: "../components" },
          ],
        }),
      ]
}