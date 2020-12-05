import Router from "@koa/router";
import IndexController from "./IndexController.js";
import ApiController from "./ApiController.js";
import BookController from "./BookController.js";

const indexController = new IndexController();

const apiController = new ApiController();

const bookController = new BookController();

const router = new Router();

function initController(app) {
  router.get("/", indexController.actionIndex);
  router.get("/api/getDataList", apiController.actionGetDataList);
  router.get("/api/getBookList", apiController.actionGetBookList);
  router.get("/book/list", bookController.actionGetBookPage);

  app.use(router.routes()).use(router.allowedMethods());
}

export default initController;
