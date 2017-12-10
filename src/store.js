export const state = {
  jiraMembers: [
    {
      imageUrl: 'src/assets/ace.png',
      name: 'Ace O\'Neal'
    },
    {
      imageUrl: 'src/assets/kate.png',
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
  ethTaskAddress: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
  ethTaskBalance: 100,
  finishedTask: {
    hero: {
      imageUrl: 'src/assets/kate.png',
      name: 'Kate Coco'
    },
    id: '12'
  }
}

export const mutations = {
  setJiraMembers (state, members) {
    state.jiraMembers = members
  }
}
