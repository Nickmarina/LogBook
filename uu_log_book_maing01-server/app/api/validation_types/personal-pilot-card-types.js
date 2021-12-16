/* eslint-disable */

const pilotCardCreateDtoInType = shape({
    name: string().isRequired(),
    desc: uu5String(16000),
  })

  const pilotCardGetDtoInType = shape({
    id: id().isRequired()
  })

  const pilotCardDeleteDtoInType = shape({
    id: id().isRequired()
  })