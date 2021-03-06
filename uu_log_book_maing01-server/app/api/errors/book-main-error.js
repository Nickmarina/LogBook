"use strict";
const BookMainUseCaseError = require("./book-main-use-case-error.js");

const Init = {
  UC_CODE: `${BookMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  LogBookDaoCreateFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}logBookDaoCreateFailed`;
      this.message = "The system failed to create logBook.";
    }
  },

  SysSetProfileFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sysSetProfileFailed`;
    }
  },

  CreateAwscFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

module.exports = {
  Init,
};
