"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/place-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  GetUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
};

class PlaceAbl {
  constructor() {
    this.validator = Validator.load();
    this.logBookDao = DaoFactory.getDao("logBook");
    this.dao = DaoFactory.getDao("place");
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
        { awid, state: logBook.state, expectedState: "active" }
      );
    }
    // HDS 2
    const validationResult = this.validator.validate("placeGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //  HDS 3
    let uuObject = { ...dtoIn, awid };
    if (!dtoIn.pageInfo) uuObject.pageInfo = {};
    if (!uuObject.pageInfo.pageIndex) uuObject.pageInfo.pageIndex = 0;
    if (!uuObject.pageInfo.pageSize) uuObject.pageInfo.pageSize = 1000;

    // HDS 4
    const list = await this.dao.list(uuObject.awid, uuObject.pageInfo);
    if (!list) throw new Errors.List.PlaceListDaoCreateFailed({ uuAppErrorMap }, { awid });

    // HDS 5
    return {
      ...list,
      pageInfo: uuObject.pageInfo,
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
    const validationResult = this.validator.validate("placeGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 3

    const place = await this.dao.get(awid, dtoIn.id);
    if (!place) {
      throw new Errors.Get.PlaceDoesNotExist({ uuAppErrorMap }, { place: dtoIn.id });
    }
    // HDS 4
    return {
      ...place,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Delete.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active") {
      throw new Errors.Delete.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: logBook.state, expectedState: "active" }
      );
    }
    // HDS 2
    const validationResult = this.validator.validate("placeDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    // HDS 3
    const card = await this.dao.get(awid, dtoIn.id);
    if (!card) {
      throw new Errors.Delete.PlaceDoesNotExist({ uuAppErrorMap }, { card: dtoIn.id });
    }
    // HDS 4
    await this.dao.delete(awid, dtoIn.id);

    // HDS 5
    return {
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
    const validationResult = this.validator.validate("placeCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3
    const uuObject = { ...dtoIn, awid };

    let place = null;
    try {
      place = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.PlaceDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4
    return {
      ...place,
      uuAppErrorMap,
    };
  }
}

module.exports = new PlaceAbl();
