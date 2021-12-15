"use strict";
const PlaceAbl = require("../../abl/place-abl.js");

class PlaceController {

  get(ucEnv) {
    return PlaceAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return PlaceAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return PlaceAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new PlaceController();
