import axios from "axios";

class SaveRequest {
  static fetch(url) {
    let result = {
      code: 0,
      message: "",
      data: null
    };
    return new Promise(function (resolve) {
      axios
        .get(url)
        .then(res => {
          result.data = res.data;
          resolve(result);
        })
        .catch(err => {
          result.code = 1;
          result.message = err.message;
          result.data = [
            {
              id: 1,
              name: "JAVASCRIPT程序高级设计"
            },
            {
              id: 2,
              name: "你不知道的JAVASCRIPT"
            }
          ];
          resolve(result);
        });
    });
  }
}

export default SaveRequest;
