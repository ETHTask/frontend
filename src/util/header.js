import routeNameMappings from '../router/route-name-mappings'

export const shouldShowHeader = (path) => {
  if (path.includes(routeNameMappings.Login.path)) {
    return false
  }
  return true
}

export const getDefaultHeaderConfigObj = () => {
  return {
    title: '',
    showBalance: false,
    showDeposit: false,
    showMembers: false,
    showTasks: false,
    showImport: false,
    onBalanceClick: () => {},
    onDepositClick: () => {},
    onMembersClick: () => {},
    onTasksClick: () => {},
    onHamburgerClick: () => {},
    onImportClick: () => {}
  }
}
