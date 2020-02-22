import { checkCollinear, getDistance, moveTo } from './math'

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (arr, { minX, minY, maxX, maxY }) {
  const arrX = arr.map((value) => { return value.originX })
  const gridX = (maxX - minX) / (Math.max(...arrX, 0))
  const gridY = (maxY - minY) / 100

  var originX, originY, text
  return arr.map((value) => {
    originY = value.originY
    originX = value.originX
    text = value.text
    return {
      originX: originX,
      originY: originY,
      x: originX * gridX + minX,
      y: maxY - originY * gridY,
      text: text
    }
  })
}

/**
 * yからoriginYを再計算する
 * 
 * @param {*} y
 * @param {*} boundary 
 */
export function toOriginY (y, { minY, maxY}) {
  const gridY = (maxY - minY) / 100
  const originY = (maxY - y) / gridY
  return originY
}

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
export function genPath (pts, radius) {
  // ここそのままshiftしてしまうと親のpointsが変更されてしまうので別の配列を作成している。
  // こうしないといけないのか？？？
  var points = pts.filter(function (point) {
    return point
  })
  const start = points.shift()

  return (
    `M${start.x} ${start.y}` +
    points
      .map((point, index) => {
        const next = points[index + 1]
        const prev = points[index - 1] || start
        const isCollinear = next && checkCollinear(next, point, prev)

        if (!next || isCollinear) {
          return `L${point.x} ${point.y}`
        }

        const threshold = Math.min(
          getDistance(prev, point),
          getDistance(next, point)
        )
        const isTooCloseForRadius = threshold / 2 < radius
        const radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius

        const before = moveTo(prev, point, radiusForPoint)
        const after = moveTo(next, point, radiusForPoint)

        return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${
          after.y
        }`
      })
      .join('')
  )
}
