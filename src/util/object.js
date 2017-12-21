import { createWorker, createTask } from './db/transform'

export const mergeStoreAndAPIWorkers = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el.jiraId] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el.jiraId]) {
      mergedList.push(createWorker(el))
    }
  })

  return mergedList
}

export const mergeStoreAndAPITasks = (fromAPI, fromStore, configObj) => {
  const mergedList = [...fromStore]

  const idToEl = fromStore.reduce((acc, el) => {
    acc[el.jiraId] = el
    return acc
  }, {})

  fromAPI.forEach(el => {
    if (!idToEl[el.jiraId]) {
      mergedList.push(createTask(el))
    }
  })

  return mergedList
}
