import {
  projectDSL,
  workerDSL,
  taskDSL,
  teamDSL
} from './dsl'

export const createWorker = (worker) => {
  return Object.keys(worker).reduce((acc, field) => {
    if (workerDSL[field]) {
      acc[workerDSL[field]] = worker[field]
    }
    return acc
  }, {})
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
  return Object.keys(task).reduce((acc, field) => {
    if (taskDSL[field]) {
      acc[taskDSL[field]] = task[field]
    }
    return acc
  }, {})
}
