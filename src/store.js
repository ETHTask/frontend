import {
  mergeStoreAndAPIWorkers,
  mergeStoreAndAPITasks,
  mergeStoreAndAPITasksDone,
  mergeStoreAndAPIProjects,
  mergeStoreAndAPITeams
} from './util/object'

export const state = {
  loggedIn: false,
  doneTasks: [],
  doneTrelloId: '',
  trelloToken: '',
  selectedTeam: {
    trelloId: '',
    trelloName: '',
    displayName: ''
  },
  selectedProject: {
    name: '',
    trelloId: '',
    tasks: [],
    workers: []
  },
  loggedInUser: {
    name: '',
    logo: '',
    email: '',
    ethTaskAddress: '',
    ethTaskBalance: 0,
    repFirstName: '',
    repLastName: '',
    projects: [],
    teams: [],
    registeredSmartContract: false
  }
}

export const mutations = {
  setWorkers (state, workers) {
    const workersFromAPI = workers[0]
    const workersFromStore = workers[1]
    state.selectedProject.workers = mergeStoreAndAPIWorkers(workersFromAPI, workersFromStore)
    console.log('Trello members set: ', state.selectedProject.workers)
  },
  setProjects (state, projects) {
    const projectsFromAPI = projects[0]
    const projectsFromStore = projects[1]
    state.loggedInUser.projects = mergeStoreAndAPIProjects(projectsFromAPI, projectsFromStore)
    console.log('Trello projects set: ', state.loggedInUser.projects)
  },
  setTeams (state, teams) {
    const teamsFromAPI = teams[0]
    const teamsFromStore = teams[1]
    state.loggedInUser.teams = mergeStoreAndAPITeams(teamsFromAPI, teamsFromStore)
    console.log('Trello teams set: ', state.loggedInUser.teams)
  },
  setToken (state, token) {
    state.trelloToken = token
    console.log('Trello token set: ', state.trelloToken)
  },
  setTasks (state, tasks) {
    const tasksFromAPI = tasks[0]
    const tasksFromStore = tasks[1]
    state.selectedProject.tasks = mergeStoreAndAPITasks(tasksFromAPI, tasksFromStore, state.doneTrelloId)
    console.log('Trello tasks set: ', state.selectedProject.tasks)
  },
  setDoneTasks (state, tasks) {
    const tasksFromAPI = tasks[0]
    const tasksFromStore = tasks[1]
    state.doneTasks = mergeStoreAndAPITasksDone(tasksFromAPI, tasksFromStore, state.doneTrelloId)
    console.log('Trello done-tasks set: ', state.doneTasks)
  },
  setSelectedProject (state, project) {
    state.selectedProject = project
    if (!project.tasks) {
      state.selectedProject.tasks = []
    }
    if (!project.workers) {
      state.selectedProject.workers = []
    }
    console.log('Trello selected project set: ', state.selectedProject)
  },
  setSelectedTeam (state, team) {
    state.selectedTeam = team
    state.selectedProject = {
      name: '',
      trelloId: '',
      tasks: [],
      workers: []
    }
    console.log('Trello selected team set: ', state.selectedTeam)
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = user
    console.log('Logged in user set: ', state.loggedInUser)
  },
  setRegisteredSmartContract (state, flag) {
    const user = {...state.loggedInUser}
    user.registeredSmartContract = flag
    state.loggedInUser = user
    console.log('Registered smart contract set: ', state.loggedInUser.registeredSmartContract)
  },
  setLoggedIn (state, loggedIn) {
    state.loggedIn = loggedIn
    console.log('Logged in state set: ', state.loggedIn)
  }
}
