import routeNameMappings from './route-name-mappings'

export const getTitle = (path) => {
  if (path.includes(routeNameMappings.ImportTeam.path)) {
    return 'Import your team members'
  }
  if (path.includes(routeNameMappings.AddAddresses.path)) {
    return 'Add ETH addresses'
  }
  if (path.includes(routeNameMappings.AddRewards.path)) {
    return 'Add ETH rewards'
  }
  if (path.includes(routeNameMappings.Reward.path)) {
    return 'Task complete!'
  }
  if (path.includes(routeNameMappings.DepositEth.path)) {
    return 'Deposit your ETH'
  }
  return 'Welcome!'
}

export const getHamburgerShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  return true
}

export const getBalanceShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  return true
}

export const getDepositShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.DepositEth.path)) {
    return false
  }
  return true
}

export const getMembersShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.AddAddresses.path)) {
    return false
  }
  return true
}

export const getTasksShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.AddRewards.path)) {
    return false
  }
  return true
}
