import { mergeStoreAndAPIWorkers, mergeStoreAndAPITasks } from './util/object'

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
    tasks: []
  }
}

export const mutations = {
  setWorkers (state, workers) {
    const workersFromAPI = workers[0]
    const workersFromStore = workers[1]
    state.loggedInUser.workers = mergeStoreAndAPIWorkers(workersFromAPI, workersFromStore)
    console.log('JIRA members set: ', state.loggedInUser.workers)
  },
  setTasks (state, tasks) {
    const tasksFromAPI = tasks[0]
    const tasksFromStore = tasks[1]
    state.loggedInUser.tasks = mergeStoreAndAPITasks(tasksFromAPI, tasksFromStore)
    console.log('JIRA tasks set: ', state.loggedInUser.tasks)
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = user
    console.log('Logged in user set: ', state.loggedInUser)
  }
}
