/* eslint-disable */

const aircraftCreateDtoInType = shape({
    regNum: string(6).isRequired(),
    model: string(100).isRequired(),
    image: binary()
});


const aircraftListDtoInType = shape({
    id: id().isRequired(),
    name: string(200),
    desc: uu5String(16000),
    state: oneOf(["open","closed","tested"]),
    image: uri()
});


const aircraftSetStateDtoInType = shape({
    id: id().isRequired(),
    state: oneOf(["open","closed","tested"]).isRequired(),
})

// for setState

const aircraftGetDtoInType = shape({
    id: id().isRequired("regNum"),
    regNum: string(6).isRequired("id")
});

  const aircraftDeleteDtoInType = shape({
    id: id().isRequired("regNum"),
    regNum: string(6).isRequired("id")
});