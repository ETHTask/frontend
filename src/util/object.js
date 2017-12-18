export const mapTo = (dst, src, mapping) => {
  dst = Object.assign(dst, src)
  Object.keys(mapping).forEach(mapFrom => {
    const mapTo = mapping[mapFrom]
    dst[mapTo] = dst[mapFrom]
    delete dst[mapFrom]
  })
  return dst
}
