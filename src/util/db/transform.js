export const createWorker = (worker) => {
  return Object.keys(worker).reduce((acc, field) => {
    const acceptableFields = { jiraId: 1, imageUrl: 1, name: 1 }
    if (acceptableFields[field]) {
      acc[field] = worker[field]
    }
    return acc
  }, {})
}

export const createTask = (task) => {
  return Object.keys(task).reduce((acc, field) => {
    const acceptableFields = { jiraId: 1, url: 1 }
    if (acceptableFields[field]) {
      acc[field] = task[field]
    }
    return acc
  }, {})
}

export const transformWorkersFromAPI = (workers) => {
  return workers.map(createWorker)
}

export const transformTasksFromAPI = (tasks) => {
  return tasks.map(createTask)
}
