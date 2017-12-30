import { createWorker, createTask, createProject } from './db/transform'
import { idDSL } from './db/dsl'

export const mergeStoreAndAPIWorkers = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el[idDSL[0]]]) {
      mergedList.push(createWorker(el))
    }
  })

  return mergedList
}

export const mergeStoreAndAPITasks = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el[idDSL[0]]]) {
      mergedList.push(createTask(el))
    }
  })

  return mergedList
}

export const mergeStoreAndAPIProjects = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el[idDSL[1]]] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el[idDSL[0]]]) {
      mergedList.push(createProject(el))
    }
  })

  return mergedList
}
