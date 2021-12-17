/* eslint-disable */

const logBookEntryCreateDtoInType = shape({
    departureDate: date().isRequired(),
    arrivalDate: date().isRequired(),
    departurePlace: string(3).isRequired(),
    arrivalPlace: string(3).isRequired(),
    coPilotIdentity: id(),
    regNum: string(6).isRequired()
  
});

const logBookEntryListDtoInType = shape({
    sortBy:oneOf(["regNum", "departureDate"]),
    order: oneOf(["asc", "desc"]),
    regNum: string(6),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
});

const logBookEntryListByPilotDtoInType = shape({
    sortBy: oneOf(["regNum", "departureDate"]),
    order: oneOf(["asc", "desc"]),
    regNum: string(6),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
});

const logBookEntryUpdateDtoInType = shape({
    id: id().isRequired(),
    departureDate: date(),
    arrivalDate: date(),
    departurePlace: string(3),
    arrivalPlace: string(3),
    coPilotIdentity: uuIdentity(),
    regNum: string(6), 
    entryState: oneOf(["APPROVED", "DISAPPROVED", "IN_PROGRESS"])
});

const logBookEntryGetDtoInType = shape({
    id: id().isRequired()
  });

const logBookEntryDeleteDtoInType = shape({
    id: id().isRequired(),
});


