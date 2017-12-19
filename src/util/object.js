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
    acc[el.id] = el[key]
    return acc
  }, {})

  return tgt.map(el => {
    el[key] = idToKey[el.id]
    return el
  })
}
