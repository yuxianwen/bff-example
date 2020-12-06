const pluginName = "AfterHtmlPlugin";

const HtmlWebpackPlugin = require("html-webpack-plugin")


function createHtml(type, array) {
    let result =''
    if(type ==='js') {
        array.forEach(element => {
            result += `<script src="${element}"></script>`
        });
    }
    if(type ==='css') {
        array.forEach(element => {
            result += `<link rel="stylesheet" src="${element}"></link>`
        });
    }
    return result
}
class AfterHtmlPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("AfterHtmlPlugin", compilation => {
      console.log("The compiler is starting a new compilation...");

      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        "AfterHtmlPlugin", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
        //   data.html += "The Magic Footer";
        console.log(data)
        this.scriptAssets = data.assets.js
        this.cssAssets = data.assets.css
          // Tell webpack to move on
          cb(null, data);
        }
      );

      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "AfterHtmlPlugin", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          let scriptString= createHtml('js', this.scriptAssets)
          let cssString= createHtml('css', this.cssAssets)
        //   createHtml(css, this.cssAssets)
          // Tell webpack to move on
          data.html = data.html.replace('<!-- injectjs -->', scriptString)
          data.html = data.html.replace('<!-- injectcss -->', cssString)
          cb(null, data);
        }
      );
    });
  }
}

module.exports = AfterHtmlPlugin;
