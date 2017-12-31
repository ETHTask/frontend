import routeNameMappings from './route-name-mappings'

export const getTitle = (path) => {
  if (path.includes(routeNameMappings.TeamMembers.path)) {
    return 'Your team members'
  }
  if (path.includes(routeNameMappings.Projects.path)) {
    return 'Your projects'
  }
  if (path.includes(routeNameMappings.Teams.path)) {
    return 'Your teams'
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
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  return true
}

export const getBalanceShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  return true
}

export const getDepositShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  if (path.includes(routeNameMappings.DepositEth.path)) {
    return false
  }
  return true
}

export const getProjectsShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  if (path.includes(routeNameMappings.Projects.path)) {
    return false
  }
  return true
}

export const getTeamsShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  if (path.includes(routeNameMappings.Teams.path)) {
    return false
  }
  return true
}

export const getWorkersShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.SignUp.path)) {
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
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  if (path.includes(routeNameMappings.Tasks.path)) {
    return false
  }
  return true
}

export const getLogoutShowing = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  if (path.includes(routeNameMappings.SignUp.path)) {
    return false
  }
  return true
}
