const request = require("supertest");
const expect = require("chai").expect;

describe("node接口测试", function () {
  it("图书列表api接口测试", function () {
    request("http://localhost:3000")
      .get("/api/getBookList")
      .expect(200)
      .end(function (err, res) {
        expect(res.body.data.length).equal(2);
        expect(res.body.data[0].name).equal("JAVASCRIPT程序高级设计");
      });
  });
});
