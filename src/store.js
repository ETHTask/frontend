import {
  mergeStoreAndAPIWorkers,
  mergeStoreAndAPITasks,
  mergeStoreAndAPIProjects,
  mergeStoreAndAPITeams
} from './util/object'

export const state = {
  finishedTask: {
    hero: {
      imageUrl: 'static/assets/kate.png',
      name: 'Kate Coco'
    },
    id: '12'
  },
  trelloToken: '',
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
    }
  }
}

export const mutations = {
  setWorkers (state, workers) {
    const workersFromAPI = workers[0]
    const workersFromStore = workers[1]
    state.loggedInUser.selectedProject.workers = mergeStoreAndAPIWorkers(workersFromAPI, workersFromStore)
    console.log('Trello members set: ', state.loggedInUser.selectedProject.workers)
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
    state.loggedInUser.selectedProject.tasks = mergeStoreAndAPITasks(tasksFromAPI, tasksFromStore)
    console.log('Trello tasks set: ', state.loggedInUser.selectedProject.tasks)
  },
  setSelectedProject (state, project) {
    state.loggedInUser.selectedProject = project
    if (!project.tasks) {
      state.loggedInUser.selectedProject.tasks = []
    }
    if (!project.workers) {
      state.loggedInUser.selectedProject.workers = []
    }
    console.log('Trello selected project set: ', state.loggedInUser.selectedProject)
  },
  setSelectedTeam (state, team) {
    state.loggedInUser.selectedTeam = team
    state.loggedInUser.selectedProject = {
      name: '',
      trelloId: '',
      tasks: [],
      workers: []
    }
    console.log('Trello selected team set: ', state.loggedInUser.selectedTeam)
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = user
    console.log('Logged in user set: ', state.loggedInUser)
  }
}
