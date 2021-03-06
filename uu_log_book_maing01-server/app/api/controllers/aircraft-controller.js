"use strict";
const AircraftAbl = require("../../abl/aircraft-abl.js");

class AircraftController {
  setState(ucEnv) {
    return AircraftAbl.setState(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return AircraftAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return AircraftAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return AircraftAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return AircraftAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  async getImageData(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let dtoOut = await AircraftAbl.getImageData(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }
}

module.exports = new AircraftController();
