"use strict";
const LogBookEntryAbl = require("../../abl/log-book-entry-abl.js");

class LogBookEntryController {

  delete(ucEnv) {
    return LogBookEntryAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return LogBookEntryAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return LogBookEntryAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listByPilot(ucEnv) {
    return LogBookEntryAbl.listByPilot(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return LogBookEntryAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return LogBookEntryAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new LogBookEntryController();
