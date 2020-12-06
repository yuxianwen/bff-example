import Koa from "koa";
import render from "koa-swig";
import config from "./config";
import serve from "koa-static";
import initController from "./controllers";
import co from "co";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import ErrorHandler from "./middlewares/errorHandler";
import log4js from "log4js";

// 错误日志
log4js.configure({
  appenders: { globalError: { type: "file", filename: "./logs/error.log" } },
  categories: { default: { appenders: ["globalError"], level: "error" } }
});

const logger = log4js.getLogger("cheese");

const app = new Koa();

// swig 模板
app.context.render = co.wrap(
  render({
    root: config.viewDir,
    cache: config.cache,
    varControls: ["[[", "]]"]
  })
);

ErrorHandler.error(app, logger);
// 初始化中间件
app.use(serve(config.staticDir));
// app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));
// 初始化路由
initController(app);

app.listen(config.port, () => {
  console.log(`sever is running at http://localhost:${config.port} host Test!`);
});
