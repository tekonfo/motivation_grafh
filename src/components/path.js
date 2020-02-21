import { genPath } from '../helpers/path'

export default {
  props: ['smooth', 'radius', 'id', 'points'],

  render (h) {
    const { points, smooth, radius, id } = this
    const d = genPath(points, smooth ? radius : 0)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${id})` }
    })
  }
}
