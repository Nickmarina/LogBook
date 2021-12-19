"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/log-book-entry-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
};

class LogBookEntryAbl {
  constructor() {
    this.validator = Validator.load();
    this.logBookDao = DaoFactory.getDao("logBook");
    this.placeDao = DaoFactory.getDao("place");
    this.pilotDao = DaoFactory.getDao("personalPilotCard");
    this.dao = DaoFactory.getDao("logBookEntry");
  }

  async delete(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Delete.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "active") {
      throw new Errors.Delete.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, currentState: logBook.state, expectedState: "active" }
      );
    }

    // HDS 2
    const validationResult = this.validator.validate("logBookEntryDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    // HDS 3
    const entry = await this.dao.get(awid, dtoIn.id);
    if (!entry) {
      throw new Errors.Delete.EntryDoesNotExist({ uuAppErrorMap }, { entry: dtoIn.id });
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
        { awid, currentState: logBook.state, expectedState: "active" }
      );
    }

    // HDS 2
    const validationResult = this.validator.validate("logBookEntryGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 3
    const logBookEntry = await this.dao.get(awid, dtoIn.id);

    if (!logBookEntry) {
      throw new Errors.Get.RecordInLogBookgetDaoFailed({ uuAppErrorMap }, { awid });
    }

    // HDS 4
    return {
      ...logBookEntry,
      uuAppErrorMap,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Update.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "underConstruction" && logBook.state !== "active") {
      throw new Errors.Update.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, currentState: logBook.state, expectedState: ["active", "underConstruction"] }
      );
    }

    // HDS 2
    const validationResult = this.validator.validate("logBookEntryUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // HDS 3
    const logBookEntry = await this.dao.get(awid, dtoIn.id);
    if (!logBookEntry) {
      throw new Errors.Update.LogBookEntryDoesNotExist({ uuAppErrorMap }, { logBookEntryId: dtoIn.id });
    }

    // HDS 4
    // something else
    const uuObject = { awid, ...dtoIn };
    const updatedEntry = await this.dao.update(uuObject);

    // HDS 5
    return {
      ...updatedEntry,
      uuAppErrorMap,
    };
  }

  async listByPilot(awid, dtoIn, uuAppErrorMap) {
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
  //   // HDS 2

  //   const validationResult = this.validator.validate("logBookEntryListByPilotDtoInType", dtoIn);
  //   uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.deleteUnsupportedKeys.code,
  //     Errors.List.InvalidDtoIn
  // ); 

    //  HDS 3
    let uuObject = { ...dtoIn, awid };
    if (!dtoIn.pageInfo) uuObject.pageInfo = {};
    if (!uuObject.pageInfo.pageIndex) uuObject.pageInfo.pageIndex = 0;
    if (!uuObject.pageInfo.pageSize) uuObject.pageInfo.pageSize = 1000;
    if (!dtoIn.order) uuObject.order = "asc";
    if (!dtoIn.sortBy) uuObject.sortBy = "departureDate";

    // HDS 3
    let list = null;

    const { coPilotIdentity, sortBy, order, pageInfo, regNum } = uuObject;

    !dtoIn.regNum
      ? (list = await this.dao.listByUuIdentity(awid, coPilotIdentity, sortBy, order, pageInfo))
      : (list = await this.dao.listByRegNumAndUuIdentity(awid, coPilotIdentity, regNum, sortBy, order, pageInfo));

    // HDS 4
    return {
      ...list,
      uuAppErrorMap,
    };
  }

  // async list(awid, dtoIn, uuAppErrorMap) {
  //   // HDS 1
  //   const logBook = await this.logBookDao.getByAwid(awid);
  //   if (!logBook) {
  //     throw new Errors.List.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
  //   }
  //   if (logBook.state !== "active") {
  //     throw new Errors.List.LogBookIsNotInCorrectState(
  //       { uuAppErrorMap },
  //       { awid, currentState: logBook.state, expectedState: "active" }
  //     );
  //   }
  //   // HDS 2
  //   const validationResult = this.validator.validate("logBookEntryListDtoInType", dtoIn);
  //   uuAppErrorMap = ValidationHelper.processValidationResult(
  //     dtoIn,
  //     validationResult,
  //     WARNINGS.unsupportedKeys.code,
  //     Errors.List.InvalidDtoIn
  //   );

  //   let uuObject = { ...dtoIn, awid };
  //   if (!dtoIn.pageInfo) uuObject.pageInfo = {};
  //   if (!uuObject.pageInfo.pageIndex) uuObject.pageInfo.pageIndex = 10;
  //   if (!uuObject.pageInfo.pageSize) uuObject.pageInfo.pageSize = 50;
  //   if (!dtoIn.order) uuObject.order = "asc";
  //   if (!dtoIn.sortBy) uuObject.sortBy = "departureDate";

  //   // HDS 3

  //   let list = null;

  //   if (!dtoIn.regNum) {
  //     list = await this.dao.list(uuObject.awid, uuObject.sortBy, uuObject.order, uuObject.pageInfo);
  //   } else {
  //     list = await this.dao.listByRegNum(
  //       uuObject.awid,
  //       uuObject.RegNum,
  //       uuObject.sortBy,
  //       uuObject.order,
  //       uuObject.pageInfo
  //     );
  //   }

  //   // HDS 4
  //   return {
  //     ...list,
  //     uuAppErrorMap,
  //   };
  // }
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
    const validationResult = this.validator.validate("logBookEntryListDtoInType", dtoIn);
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
    if (!dtoIn.order) uuObject.order = "asc";
    if (!dtoIn.sortBy) uuObject.sortBy = "departureDate";

    let list = null;

    if (uuObject.regNum) {
      list = await this.dao.listByRegNum(
        uuObject.awid,
        uuObject.regNum,
        uuObject.sortBy,
        uuObject.order,
        uuObject.pageInfo
      );
    } else {
      list = await this.dao.list(uuObject.awid, uuObject.sortBy, uuObject.order, uuObject.pageInfo);
    }

    // HDS 4
    return {
      ...list,
      pageInfo: uuObject.pageInfo,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap) {
    // HDS 1
    const logBook = await this.logBookDao.getByAwid(awid);
    if (!logBook) {
      throw new Errors.Create.LogBookDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (logBook.state !== "underConstruction" && logBook.state !== "active") {
      throw new Errors.Create.LogBookIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, currentState: logBook.state, expectedState: ["active", "underConstruction"] }
      );
    }

    // HDS 2
    const validationResult = this.validator.validate("logBookEntryCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // HDS 3
    const arrival = new Date(dtoIn.arrivalDate);
    const depature = new Date(dtoIn.departureDate);
    if (arrival.getTime() <= depature.getTime()) {
      throw new Errors.Create.ArrivalDateIsNotCorrect({ uuAppErrorMap }, { deadline: dtoIn.deadline });
    }

    // HDS 4
    const arrivalPlace = this.placeDao.get({ awid, id: dtoIn.arrivalPlace });
    const departurePlace = this.placeDao.get({ awid, id: dtoIn.departurePlace });

    if (arrivalPlace === departurePlace) {
      throw new Errors.Create.ArrivalPlaceIsNotCorrect(
        { uuAppErrorMap },
        {
          arrivalPlace: dtoIn.arrivalPlace,
          departurePlace: dtoIn.departurePlace,
        }
      );
    }

    // HDS 5
    const uuObject = { awid, ...dtoIn };
    let logBookEntry = null;

    try {
      logBookEntry = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.LogBookEntryDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS 6
    return {
      ...logBookEntry,
      uuAppErrorMap,
    };
  }
}

module.exports = new LogBookEntryAbl();
