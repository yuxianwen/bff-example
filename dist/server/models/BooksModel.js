import saveRequest from "../utils/saveRequest";

class BooksModel {
  getBookList() {
    return saveRequest.fetch("/books");
  }
}

export default BooksModel;
