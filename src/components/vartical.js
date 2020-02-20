export default {
  props: ['id', 'boundary', 'padding'],

  render (h) {
    const { minX, minY, maxX, maxY } = this.boundary

    const leftAtt = minX / 2
    const rightAtt = maxX + (minX / 2)

    return h(
      'g', {
        attrs: {
          stroke: 'black',
          'stroke-width': 1
        }
      },
      [
        // 横軸
        h('line', {
          attrs: {
            x1: minX,
            x2: maxX,
            y1: maxY / 2,
            y2: maxY / 2,
            'stroke-dasharray': 10
          }
        }),
        // 縦軸
        h('line', {
          attrs: {
            x1: minX,
            x2: minX,
            y1: minY,
            y2: maxY
          }
        }),
        h('text', {
          domProps: {
            innerHTML: '年齢'
          },
          attrs: {
            x: rightAtt,
            y: maxY / 2,
            'text-anchor': 'middle',
            'dominant-baseline': 'central'
          }
        }),
        h('text', {
          domProps: {
            innerHTML: 'モチベーション'
          },
          attrs: {
            'writing-mode': 'tb',
            x: leftAtt,
            y: maxY / 2,
            'text-anchor': 'middle',
            'dominant-baseline': 'central'
          }
        })
      ]
    )
  }
}
