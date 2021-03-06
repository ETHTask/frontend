import {
  createWorker,
  createTask,
  createProject,
  createTeam
} from './db/transform'
import { idDSL, TASK_CATEGORY_ID } from './db/dsl'

export const mergeStoreAndAPIWorkers = (fromAPI, fromStore, configObj) => {
  const mergedList = []

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el[idDSL[0]]]) {
      mergedList.push(createWorker(el))
    } else {
      mergedList.push(idToEl[el[idDSL[0]]])
    }
  })

  return mergedList
}

export const mergeStoreAndAPITasks = (fromAPI, fromStore, doneId) => {
  const mergedList = []

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (el[TASK_CATEGORY_ID] !== doneId) {
      if (!idToEl[el[idDSL[0]]]) {
        mergedList.push(createTask(el))
      } else {
        mergedList.push(idToEl[el[idDSL[0]]])
      }
    }
  })

  return mergedList
}

export const mergeStoreAndAPITasksDone = (fromAPI, fromStore, doneId) => {
  const mergedList = []

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (el[TASK_CATEGORY_ID] === doneId) {
      if (!idToEl[el[idDSL[0]]]) {
        mergedList.push(createTask(el))
      } else {
        mergedList.push(idToEl[el[idDSL[0]]])
      }
    }
  })

  return mergedList
}

export const mergeStoreAndAPITeams = (fromAPI, fromStore, configObj) => {
  const mergedList = []

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el[idDSL[0]]]) {
      mergedList.push(createTeam(el))
    } else {
      mergedList.push(idToEl[el[idDSL[0]]])
    }
  })

  return mergedList
}

export const mergeStoreAndAPIProjects = (fromAPI, fromStore, configObj) => {
  const mergedList = []

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el[idDSL[0]]]) {
      mergedList.push(createProject(el))
    } else {
      mergedList.push(idToEl[el[idDSL[0]]])
    }
  })

  return mergedList
}
