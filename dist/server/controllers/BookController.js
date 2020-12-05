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

  async actionGetBookPage(ctx) {
    const data = await new BookModel().getBookList();
    // console.log(data.data)
    // console.log(data)
    ctx.body = await ctx.render("book/pages/list", { data: data.data });
  }
}

export default ApiController;
