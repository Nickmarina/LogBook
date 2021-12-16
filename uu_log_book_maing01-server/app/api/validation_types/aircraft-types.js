/* eslint-disable */

const aircraftCreateDtoInType = shape({
    regNum: string(6).isRequired(),
    model: string(100).isRequired(),
    image: binary()
});


const aircraftListDtoInType = shape({
    sortBy: oneOf(["regNum"]),
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
});


const aircraftSetStateDtoInType = shape({
    id: id().isRequired(),
    state: oneOf(["open","closed","tested"]).isRequired(),
})

const aircraftGetDtoInType = shape({
    id: id().isRequired("regNum"),
    regNum: string(6).isRequired("id")
});

  const aircraftDeleteDtoInType = shape({
    id: id().isRequired("regNum"),
    regNum: string(6).isRequired("id")
});

const aircraftGetImageDataDtoInType = shape ({
    image: code().isRequired(),
    contentDisposition: oneOf(["inline", "attachment"])
  })