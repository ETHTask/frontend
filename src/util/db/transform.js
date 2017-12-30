import {
  projectDSL,
  workerDSL,
  taskDSL
} from './dsl'

export const createWorker = (worker) => {
  return Object.keys(worker).reduce((acc, field) => {
    if (workerDSL[field]) {
      acc[workerDSL[field]] = worker[field]
    }
    return acc
  }, {})
}

export const createProject = (project) => {
  return Object.keys(project).reduce((acc, field) => {
    if (projectDSL[field]) {
      acc[projectDSL[field]] = project[field]
    }
    return acc
  }, {})
}

export const createTask = (task) => {
  return Object.keys(task).reduce((acc, field) => {
    if (taskDSL[field]) {
      acc[taskDSL[field]] = task[field]
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
