import Controller from "./Controller";
import BookModel from "../models/BooksModel";

class ApiController extends Controller {
  constructor() {
    super();
  }

  actionGetDataList(ctx) {
    ctx.body = [
      {
        id: 1,
        name: "张三"
      },
      {
        id: 2,
        name: "李四"
      }
    ];
  }

  async actionGetBookList(ctx) {
    ctx.body = await new BookModel().getBookList();
  }
}

export default ApiController;
