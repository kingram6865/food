function isFat(data) {
  // let output = {}
  const fats = ['4:0', '6:0', '8:0','10:0','12:0','14:0','16:0','16:1','18:0','18:1','18:2','18:3','18:4','20:1','20:4','20:5','22:1','22:5']

  let index = Object.keys(data)[0]
  // let fats = index.fatty_acid_type && systematic_name && index.isomer_name
  let present = fats.map(x => {
    let regex = new RegExp(x)
    return (index.search(regex) > 0) ? true : false
  })

  console.log(`Line 14: ${JSON.stringify(present)}`)

  if (present.includes(true)) {
    output = data
  } else {
    // console.log(`isFat Line 10: ${JSON.stringify(data)}`)
    output = {
      [data[index].tagname]: {
        description: index,
        value: data[index].value,
        units: data[index].units
      }
    }
  }

  return output
}


module.exports = {
  isFat
}