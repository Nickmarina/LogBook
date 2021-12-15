/* eslint-disable */

const placeCreateDtoInType = shape({
    codeOfPlace: string(3).isRequired(), 
    cityOfPlace: string(85).isRequired(), 
    coordinates: string(100).isRequired() 
})

  const placeGetDtoInType = shape({
    id: id().isRequired()
  })

  const placeDeleteDtoInType = shape({
    id: id().isRequired()
  })

  const placeListDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  })