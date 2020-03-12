import { checkCollinear, getDistance, moveTo } from './math'

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (arr, { minX, minY, maxX, maxY }) {
  if (arr.length === 0){
    return []
  }

  const gridY = (maxY - minY) / 100

  if (arr.length < 2){
    return [{
      originX: arr[0].originX,
      originY: arr[0].originY,
      x: minX,
      y: maxY - arr[0].originY * gridY,
      text: arr[0].text,
      secondText: arr[0].secondText
    }]
  }

  const arrX = arr.map((value) => { return value.originX })
  const offsetX = arrX[0]
  const lengthX = arrX[arrX.length - 1] - arrX[0]
  const gridX = (maxX - minX) / (Math.max(lengthX, 0))

  var originX, originY, text, secondText, isShowTextRight
  return arr.map((value) => {
    originY = value.originY
    originX = value.originX
    text = value.text
    secondText = value.secondText
    isShowTextRight = value.isShowTextRight
    return {
      originX: originX,
      originY: originY,
      x: (originX - offsetX) * gridX + minX,
      y: maxY - originY * gridY,
      text: text,
      secondText: secondText,
      isShowTextRight: isShowTextRight
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
  if (pts.length < 2){
    return ''
  }

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
