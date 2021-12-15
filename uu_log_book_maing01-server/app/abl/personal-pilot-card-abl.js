"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/personal-pilot-card-error.js");

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

class PersonalPilotCardAbl {
  constructor() {
    this.validator = Validator.load();
    this.logBookDao = DaoFactory.getDao("logBook");
    this.dao = DaoFactory.getDao("personalPilotCard");
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
    const validationResult = this.validator.validate("pilotCardDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    // HDS 3
    const card = await this.dao.get(awid, dtoIn.id);
    if (!card) {
      throw new Errors.Delete.CardDoesNotExist({ uuAppErrorMap }, { card: dtoIn.id });
    }
    // HDS 4
    await this.dao.delete(awid, dtoIn.id);

    // HDS 5
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
    const validationResult = this.validator.validate("pilotCardGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 3

    const card = await this.dao.get(awid, dtoIn.id);
    if (!card) {
      throw new Errors.Get.CardDoesNotExist({ uuAppErrorMap }, { card: dtoIn.id });
    }
    // HDS 4
    return {
      ...card,
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
    const validationResult = this.validator.validate("pilotCardCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3
    const uuObject = { ...dtoIn, awid };

    let card = null;
    try {
      card = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.CardDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 4
    return {
      ...card,
      uuAppErrorMap,
    };
  }
}

module.exports = new PersonalPilotCardAbl();
