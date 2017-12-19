import { mapTo, addKeyToEachElement } from './util/object'

export const state = {
  jiraMembers: [],
  jiraTasks: [],
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
    workers: []
  }
}

export const mutations = {
  setJiraMembers (state, members) {
    const membersFromAPI = members[0]
    const membersFromDB = members[1]
    state.jiraMembers = addKeyToEachElement(membersFromAPI, membersFromDB, 'ethAddress')
    console.log('JIRA members set: ', state.jiraMembers)
  },
  setJiraTasks (state, tasks) {
    const tasksFromAPI = tasks[0]
    const tasksFromDB = tasks[1]
    state.jiraTasks = addKeyToEachElement(tasksFromAPI, tasksFromDB, 'ethReward')
    console.log('JIRA tasks set: ', state.jiraTasks)
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = mapTo({}, user, {
      'ethAddress': 'ethTaskAddress',
      'ethBalance': 'ethTaskBalance'
    })
    console.log('Logged in user set: ', state.loggedInUser)
  }
}
