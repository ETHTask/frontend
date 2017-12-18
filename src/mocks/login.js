export const mockLoggedInUser = {
  data: {
    '_id': '5a37376ec05d784f147bf0a1',
    'name': 'EthTask',
    'logo': '/img/ethtask.png',
    'repFirstName': 'Nikhil',
    'repLastName': 'Bhaskar',
    'ethAddress': '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
    'ethBalance': 100,
    '__v': 0,
    'workers': [{
      '__v': 0,
      'jiraID': '1122',
      'firstName': 'Andrew',
      'lastName': 'Smith',
      '_id': '5a37376ec05d784f147bf0a0',
      'completedJiraTasks': [{
        '__v': 0,
        'jiraID': '12',
        'reward': 12,
        '_id': '5a37376ec05d784f147bf09f'
      }]
    }]
  }
}

export const mockLoginErrorResponse = {
  data: {
    error: 'Sorry, an error occured when trying to log you in. Try again in a little while!'
  }
}
