"use strict";

const BookMainUseCaseError = require("./book-main-use-case-error.js");
const LOG_BOOK_ENTRY_ERROR_PREFIX = `${BookMainUseCaseError.ERROR_PREFIX}logBookEntry/`;

const Create = {
  UC_CODE: `${LOG_BOOK_ENTRY_ERROR_PREFIX}create/`,

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

  ArrivalDateIsNotCorrect: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}arrivalDateIsNotCorrect`;
      this.message = "Arrival date cannot be the same or earlier than departure date!";
    }
  },

  ArrivalPlaceIsNotCorrect: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}arrivalPlaceIsNotCorrect`;
      this.message = "Arrival place cannot be the same than departure place!";
    }
  },

  LogBookEntryDaoCreateFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}logBookEntryDaoCreateFailed`;
      this.message = "Create logBookEntry by logBookEntry DAO create failed.";
    }
  },
};

const List = {
  UC_CODE: `${LOG_BOOK_ENTRY_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },
};

const ListByPilot = {
  UC_CODE: `${LOG_BOOK_ENTRY_ERROR_PREFIX}listByPilot/`,
};

const Update = {
  UC_CODE: `${LOG_BOOK_ENTRY_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },

  LogBookEntryDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}logBookEntryDoesNotExist`;
      this.message = "LogBookEntry does not exist.";
    }
  },

  LogBookEntryInApprovedState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}logBookEntryInApprovedState`;
      this.message = "Can not update Approved state of entry.";
    }
  },

  LogBookEntryDaoUpdateFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}logBookEntryDaoUpdateFailed`;
      this.message = "Update logBookEntry by logBookEntry Dao update failed.";
    }
  },
};

const Get = {
  UC_CODE: `${LOG_BOOK_ENTRY_ERROR_PREFIX}get/`,

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

  RecordInLogBookgetDaoFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}recordInLogBookgetDaoFailed`;
      this.message = "RecordInLogBook get DAO failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${LOG_BOOK_ENTRY_ERROR_PREFIX}delete/`,
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

  EntryDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}entryDoesNotExist`;
      this.message = "Entry Does Not Exist";
    }
  },
};

module.exports = {
  Delete,
  Get,
  Update,
  ListByPilot,
  List,
  Create,
};
