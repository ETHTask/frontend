import routeNameMappings from './route-name-mappings'

export const getTitle = (path) => {
  if (path.includes(routeNameMappings.Import.path)) {
    return 'Import from JIRA'
  }
  if (path.includes(routeNameMappings.TeamMembers.path)) {
    return 'Your team members'
  }
  if (path.includes(routeNameMappings.Tasks.path)) {
    return 'Your open tasks'
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
  if (path.includes(routeNameMappings.TeamMembers.path)) {
    return false
  }
  return true
}

export const getTasksShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.Tasks.path)) {
    return false
  }
  return true
}

export const getImportShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.Import.path)) {
    return false
  }
  return true
}
