export const createWorker = (worker) => {
  const acceptableFields = {
    id: 'trelloId',
    imageUrl: 'imageUrl',
    name: 'name'
  }
  return Object.keys(worker).reduce((acc, field) => {
    if (acceptableFields[field]) {
      acc[acceptableFields[field]] = worker[field]
    }
    return acc
  }, {})
}

export const createProject = (project) => {
  const acceptableFields = { id: 'trelloId', name: 'name' }
  return Object.keys(project).reduce((acc, field) => {
    if (acceptableFields[field]) {
      acc[acceptableFields[field]] = project[field]
    }
    return acc
  }, {})
}

export const createTask = (task) => {
  const acceptableFields = {
    id: 'trelloId',
    imageUrl: 'imageUrl',
    name: 'name'
  }
  return Object.keys(task).reduce((acc, field) => {
    if (acceptableFields[field]) {
      acc[acceptableFields[field]] = task[field]
    }
    return acc
  }, {})
}

export const transformProjectsFromAPI = (projects) => {
  return projects.map(createProject)
}

export const transformWorkersFromAPI = (workers) => {
  return workers.map(createWorker)
}

export const transformTasksFromAPI = (tasks) => {
  return tasks.map(createTask)
}
