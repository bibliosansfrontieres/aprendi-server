exports.urlValidate = (input) => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input)
}
