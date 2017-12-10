export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
export const isValidReward = (reward) => {
  return /^(0|[1-9]\d*)(\.\d+)?$/.test(reward)
}
