export const mapTo = (dst, src, mapping) => {
  dst = Object.assign(dst, src)
  Object.keys(mapping).forEach(mapFrom => {
    const mapTo = mapping[mapFrom]
    dst[mapTo] = dst[mapFrom]
    delete dst[mapFrom]
  })
  return dst
}

export const addKeyToEachElement = (tgt, dst, key) => {
  const idToKey = dst.reduce((acc, el) => {
    acc[el.jiraId] = el[key]
    return acc
  }, {})

  return tgt.map(el => {
    el[key] = idToKey[el.jiraId]
    return el
  })
}
