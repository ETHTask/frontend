import { createWorker, createTask, createProject } from './db/transform'

export const mergeStoreAndAPIWorkers = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el.trelloId] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el.trelloId]) {
      mergedList.push(createWorker(el))
    }
  })

  return mergedList
}

export const mergeStoreAndAPITasks = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el.trelloId] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el.trelloId]) {
      mergedList.push(createTask(el))
    }
  })

  return mergedList
}

export const mergeStoreAndAPIProjects = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el.trelloId] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el.trelloId]) {
      mergedList.push(createProject(el))
    }
  })

  return mergedList
}
