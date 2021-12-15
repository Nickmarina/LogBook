"use strict";

const BookMainUseCaseError = require("./book-main-use-case-error.js");
const PERSONAL_PILOT_CARD_ERROR_PREFIX = `${BookMainUseCaseError.ERROR_PREFIX}personalPilotCard/`;

const Create = {
  UC_CODE: `${PERSONAL_PILOT_CARD_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },

  CardDaoCreateFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logBookEntryDaoCreateFailed`;
      this.message = "Create card by DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${PERSONAL_PILOT_CARD_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },

  CardDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}cardDoesNotExist`;
      this.message = "Card Does Not Exist";
    }
  },
};

const Delete = {
  UC_CODE: `${PERSONAL_PILOT_CARD_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },

  CardDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}cardDoesNotExist`;
      this.message = "Card Does Not Exist";
    }
  },
};

module.exports = {
  Delete,
  Get,
  Create,
};
