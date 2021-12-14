"use strict";
const BookMainAbl = require("../../abl/book-main-abl.js");

class BookMainController {
  init(ucEnv) {
    return BookMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new BookMainController();
