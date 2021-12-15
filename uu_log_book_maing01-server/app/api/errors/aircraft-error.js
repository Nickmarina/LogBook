"use strict";

const BookMainUseCaseError = require("./book-main-use-case-error.js");
const AIRCRAFT_ERROR_PREFIX = `${BookMainUseCaseError.ERROR_PREFIX}aircraft/`;

const Create = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}create/`,
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
  AircraftDaoCreateFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}aircraftDaoCreateFailed`;
      this.message = "Create aircraft by DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}get/`,
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
  AircraftGetDaoFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}aircraftGetDaoFailed`;
      this.message = "Aircraft get DAO failed.";
    }
  },
  AircraftGetByRegNumDaoFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}aircraftGetByRegNumDaoFailed`;
      this.message = "Aircraft getByRegNum DAO failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },

  AircraftGetDaoFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftGetDaoFailed`;
      this.message = "Aircraft get DAO failed.";
    }
  },

  AircraftGetByRegNumDaoFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftGetByRegNumDaoFailed`;
      this.message = "Aircraft getByRegNum DAO failed.";
    }
  },

  UuBinaryDeleteFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuBinaryDeleteFailed`;
      this.message = "Deleting uuBinary failed.";
    }
  },

  AircraftInActiveState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftInActiveState`;
      this.message = "Can not delete Active aircraft.";
    }
  },

  AircraftDaoDeleteFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}aircraftDaoDeleteFailed`;
      this.message = "The system failed to delete the aircraft uuObject.";
    }
  },
};

const List = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}list/`,
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

const SetState = {
  UC_CODE: `${AIRCRAFT_ERROR_PREFIX}setState/`,
  InvalidDtoIn: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LogBookDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}logBookDoesNotExist`;
      this.message = "LogBook does not exist.";
    }
  },

  LogBookIsNotInCorrectState: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}logBookIsNotInCorrectState`;
      this.message = "LogBook is not in correct state.";
    }
  },
  AircraftDaoUpdateFailed: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}aircraftDaoUpdateFailed`;
      this.message = "Update aircraft by DAO create failed.";
    }
  },
  AircraftDoesNotExist: class extends BookMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}aircraftDoesNotExis`;
      this.message = "Aircraft Does Not Exis.";
    }
  },
};

module.exports = {
  SetState,
  List,
  Delete,
  Get,
  Create,
};
