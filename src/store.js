import {
  mergeStoreAndAPIWorkers,
  mergeStoreAndAPITasks,
  mergeStoreAndAPIProjects
} from './util/object'

export const state = {
  finishedTask: {
    hero: {
      imageUrl: 'static/assets/kate.png',
      name: 'Kate Coco'
    },
    id: '12'
  },
  loggedInUser: {
    name: '',
    logo: '',
    email: '',
    ethTaskAddress: '',
    ethTaskBalance: 0,
    repFirstName: '',
    repLastName: '',
    workers: [],
    projects: [],
    selectedProject: {
      name: '',
      id: '',
      tasks: []
    }
  }
}

export const mutations = {
  setWorkers (state, workers) {
    const workersFromAPI = workers[0]
    const workersFromStore = workers[1]
    state.loggedInUser.workers = mergeStoreAndAPIWorkers(workersFromAPI, workersFromStore)
    console.log('Trello members set: ', state.loggedInUser.workers)
  },
  setProjects (state, projects) {
    const projectsFromAPI = projects[0]
    const projectsFromStore = projects[1]
    state.loggedInUser.projects = mergeStoreAndAPIProjects(projectsFromAPI, projectsFromStore)
    console.log('Trello projects set: ', state.loggedInUser.projects)
  },
  setTasks (state, tasks) {
    const tasksFromAPI = tasks[0]
    const tasksFromStore = tasks[1]
    state.loggedInUser.selectedProject.tasks = mergeStoreAndAPITasks(tasksFromAPI, tasksFromStore)
    console.log('Trello tasks set: ', state.loggedInUser.selectedProject.tasks)
  },
  setSelectedProject (state, project) {
    state.loggedInUser.selectedProject = project
    console.log('Trello selected project set: ', state.loggedInUser.selectedProject)
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = user
    console.log('Logged in user set: ', state.loggedInUser)
  }
}
