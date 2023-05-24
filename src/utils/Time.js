function checkTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

export function toTime(Time) {
  const date = new Date(Time)

  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = checkTime(date.getDate()) + ' '
  const h = checkTime(date.getHours()) + ':'
  const m = checkTime(date.getMinutes()) + ':'
  const s = checkTime(date.getSeconds())

  return Y + M + D + h + m + s
}

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}
