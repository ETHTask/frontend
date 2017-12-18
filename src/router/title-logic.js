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
  if (path.includes(routeNameMappings.Login.path)) {
    return 'Welcome!'
  }
  return 'Deposit your ETH'
}
