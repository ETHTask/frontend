import { mapTo } from './util/object'

export const state = {
  jiraMembers: [
    {
      imageUrl: 'static/assets/ace.png',
      name: 'Ace O\'Neal'
    },
    {
      imageUrl: 'static/assets/kate.png',
      name: 'Kate Coco'
    }
  ],
  jiraTasks: [
    {
      url: '',
      id: '11'
    },
    {
      url: '',
      id: '12'
    }
  ],
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
    ethTaskAddress: '',
    ethTaskBalance: 0,
    repFirstName: '',
    repLastName: '',
    workers: []
  }
}

export const mutations = {
  setJiraMembers (state, members) {
    state.jiraMembers = members
  },
  setLoggedInUser (state, user) {
    state.loggedInUser = mapTo({}, user, {
      'ethAddress': 'ethTaskAddress',
      'ethBalance': 'ethTaskBalance'
    })
    console.log('logged in user set ', state.loggedInUser)
  }
}
