export const findElByValue = (arr, key, value) => {
  return arr.find(el => {
    return el[key] == value
  })
}
