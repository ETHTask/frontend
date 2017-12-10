import routeNameMappings from './route-name-mappings'

export default function (path) {
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
  return 'Deposit your ETH'
}
