class ErrorHandler {
  static error(app, logger) {
    // 全局错误
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error);
        ctx.body = "<h1>500， 服务器内部错误！</h1>";
      }
    });

    // 4040错误

    app.use(async (ctx, next) => {
      await next();
      if (ctx.status === 404) {
        ctx.body =
          '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://localhost:3000" homePageName="回到我的主页"></script>';
      }
    });
  }
}

export default ErrorHandler;
