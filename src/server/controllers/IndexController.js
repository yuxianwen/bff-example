import Controller from "./Controller";

class IndexController extends Controller {
  constructor() {
    super();
  }

  async actionIndex(ctx) {
    // throw new Error("Not implemented");
    ctx.body = await ctx.render("index", { message: "Hello world ！" });
  }
}

export default IndexController;
