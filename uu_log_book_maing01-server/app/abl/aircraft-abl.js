"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/aircraft-error.js");
const { BinaryStoreError } = require("uu_appg01_binarystore");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  setStateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getImageDataUnsupportedKeys: {
    code: `${Errors.GetImageData.UC_CODE}unsupportedKeys`,
  },
};

class AircraftAbl {
  constructor() {
    this.validator = Validator.load();
    this.logBookDao = DaoFactory.getDao("logBook");
    this.imageDao = DaoFactory.getDao("aircraftImage");
    this.dao = DaoFactory.getDao("aircraft");
  }

  async setState(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.SetState.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active" && logBook.state !== "underConstruction") {
      throw new Errors.SetState.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: logBook.state, expectedState: ["active", "underConstruction"] }
      );
    }
    // HDS 2
    const validationResult = this.validator.validate("aircraftSetStateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.setStateUnsupportedKeys.code,
      Errors.SetState.InvalidDtoIn
    );

    //  HDS 3
    const aircraft = await this.dao.get(awid, dtoIn.id);
    if (!aircraft) {
      throw new Errors.SetState.AircraftDoesNotExist({ uuAppErrorMap }, { aircraft: dtoIn.id });
    }
    //  HDS 4
    let updatedAircraft = null;
    try {
      updatedAircraft = await this.dao.setState({ awid, id: dtoIn.id, state: dtoIn.state });
    } catch {
      throw new Errors.SetState.AircraftDaoUpdateFailed({ uuAppErrorMap }, { aircraft: dtoIn.id });
    }

    //  HDS 5
    return {
      ...updatedAircraft,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.List.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active") {
      throw new Errors.List.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, currentState: logBook.state, expectedState: "active" }
      );
    }

    // HDS 2
    const validationResult = this.validator.validate("aircraftListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let uuObject = { ...dtoIn, awid };
    if (!dtoIn.pageInfo) uuObject.pageInfo = {};
    if (!uuObject.pageInfo.pageIndex) uuObject.pageInfo.pageIndex = 50;
    if (!uuObject.pageInfo.pageSize) uuObject.pageInfo.pageSize = 1000;
    if (!dtoIn.order) uuObject.order = "asc";
    if (!dtoIn.sortBy) uuObject.sortBy = "regNum";

    // HDS 3

    const list = await this.dao.list(uuObject.awid, uuObject.sortBy, uuObject.order, uuObject.pageInfo);
    // HDS 4
    return {
      ...list,
      pageInfo: uuObject.pageInfo,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Delete.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active" && logBook.state !== "underConstruction") {
      throw new Errors.Delete.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: logBook.state, expectedState: ["active", "underConstruction"] }
      );
    }
    // HDS 2
    const validationResult = this.validator.validate("aircraftDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // HDS 3
    let aircraft = null;
    if (dtoIn.id) {
      aircraft = await this.dao.get(awid, dtoIn.id);
      if (!aircraft) {
        throw new Errors.Delete.AircraftGetDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.id });
      }
    }

    if (dtoIn.regNum) {
      aircraft = await this.dao.getByRegNum(awid, dtoIn.regNum);
      if (!aircraft) {
        throw new Errors.Delete.AircraftGetByRegNumDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.regNum });
      }
    }
    // HDS 4
    if (aircraft.image) {
      await this.imageDao.deleteByCode(awid, aircraft.image);
    }
    // HDS 5
    if (aircraft.state === "active") {
      throw new Errors.Delete.AircraftInActiveState({ uuAppErrorMap }, { state: aircraft.state });
    }
    // HDS 6
    try {
      await this.dao.delete(awid, aircraft.id);
    } catch (e) {
      throw new Errors.Delete.AircraftDaoDeleteFailed({ uuAppErrorMap }, { aircraft: dtoIn.id }, e);
    }
    // HDS 7
    return {
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Get.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active") {
      throw new Errors.Get.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: logBook.state, expectedState: "active" }
      );
    }
    // HDS 2
    const validationResult = this.validator.validate("aircraftGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 3
    let aircraft = null;
    if (dtoIn.id) {
      aircraft = await this.dao.get(awid, dtoIn.id);
      if (!aircraft) {
        throw new Errors.Get.AircraftGetDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.id });
      }
    }

    if (dtoIn.regNum) {
      aircraft = await this.dao.getByRegNum(awid, dtoIn.regNum);
      if (!aircraft) {
        throw new Errors.Get.AircraftGetByRegNumDaoFailed({ uuAppErrorMap }, { aircraft: dtoIn.regNum });
      }
    }

    // HDS 4
    return {
      ...aircraft,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Create.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active") {
      throw new Errors.Create.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: logBook.state, expectedState: "active" }
      );
    }
    // HDS 2
    const validationResult = this.validator.validate("aircraftCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3
    let aircraftImage = null;
    if (dtoIn.image) {
      try {
        aircraftImage = await this.imageDao.create({ awid }, dtoIn.image);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          throw new Errors.Create.AircraftImageDaoCreateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      dtoIn.image = aircraftImage.code;
    }

    const uuObject = { ...dtoIn, awid };
    if (!dtoIn.state) uuObject.state === "active";

    let aircraft = null;
    try {
      aircraft = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.AircraftDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4
    return {
      ...aircraft,
      uuAppErrorMap,
    };
  }

  async getImageData(awid, dtoIn) {
    // hds 1
    let validationResult = this.validator.validate("aircraftGetImageDataDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getImageDataUnsupportedKeys.code,
      Errors.GetImageData.InvalidDtoIn
    );

    // hds 2
    let dtoOut;
    try {
      dtoOut = await this.imageDao.getDataByCode(awid, dtoIn.image);
    } catch (e) {
      if (e.code === "uu-app-binarystore/objectNotFound") {
        throw new Errors.GetImageData.AircraftImageDoesNotExist({ uuAppErrorMap }, { image: dtoIn.image });
      }
      throw e;
    }

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new AircraftAbl();
