import {
  projectDSL,
  workerDSL,
  taskDSL,
  teamDSL,
  taskAddons,
  workerAddons
} from './dsl'

export const createWorker = (worker) => {
  const initialObj = Object.keys(worker).reduce((acc, field) => {
    if (workerDSL[field]) {
      acc[workerDSL[field]] = worker[field]
    }
    return acc
  }, {})

  return Object.keys(workerAddons).reduce((acc, field) => {
    acc[field] = workerAddons[field]
    return acc
  }, initialObj)
}

export const createTeam = (team) => {
  return Object.keys(team).reduce((acc, field) => {
    if (teamDSL[field]) {
      acc[teamDSL[field]] = team[field]
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
  const initialObj = Object.keys(task).reduce((acc, field) => {
    if (taskDSL[field]) {
      acc[taskDSL[field]] = task[field]
    }
    return acc
  }, {})

  return Object.keys(taskAddons).reduce((acc, field) => {
    acc[field] = taskAddons[field]
    return acc
  }, initialObj)
}
