export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
export const isValidReward = (reward) => {
  return /^(0|[1-9]\d*)(\.\d+)?$/.test(reward)
}
export const isValidName = (name) => {
  if (name == null) {
    return true
  }
  if (!name.length) {
    return false
  }
  if (name.includes(' ')) {
    return false
  }
  return /^([a-zA-Z]*)$/.test(name)
}
export const isValidCompanyName = (name) => {
  if (name == null) {
    return true
  }
  if (!name.length) {
    return false
  }
  return true
}
export const isValidPassword = (text) => {
  if (text === null) {
    return true
  }
  if (!text.length) {
    return false
  }
  if (text.includes(' ')) {
    return false
  }
  return true
}
export const isValidEmail = (email) => {
  if (email === null) {
    return true
  }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}
