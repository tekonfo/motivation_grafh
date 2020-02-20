import Path from './path'
import Gradient from './gradient'
import VerticalAxis from './vartical'
import Points from './points.vue'
import { genPoints } from '../helpers/path'

export default {
  name: 'Trend',

  props: {
    value: {
      type: Array,
      required: true
    },
    autoDraw: Boolean,
    autoDrawDuration: {
      type: Number,
      default: 2000
    },
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    gradient: {
      type: Array,
      default: () => ['#000']
    },
    gradientDirection: {
      type: String,
      default: 'top'
    },
    max: {
      type: Number,
      default: -Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
    height: Number,
    width: Number,
    radius: {
      type: Number,
      default: 10
    },
    isMove: Boolean,
    selectedId: Number,
    smooth: Boolean
  },

  data: function () {
    return {
      points: [],
      boundary: [],
      viewWidth: 0,
      viewHeight: 0,
      padding: {
        x: 80,
        y: 40
      }
    }
  },

  created: function () {
    this.viewWidth = this.width || 300
    this.viewHeight = this.height || 75
    this.boundary = {
      minX: this.padding.x,
      minY: this.padding.y,
      maxX: this.viewWidth - this.padding.x,
      maxY: this.viewHeight - this.padding.y
    }
    const maxMin = { max: this.max, min: this.min }
    this.points = genPoints(this.value, this.boundary, maxMin)
  },

  mounted: function () {
    const path = this.$refs.path.$el
    const length = path.getTotalLength()

    path.style.transition = 'none'
    path.style.strokeDasharray = length + ' ' + length
    path.style.strokeDashoffset = Math.abs(
      length - (this.lastLength || 0)
    )
    path.getBoundingClientRect()
    path.style.transition = `stroke-dashoffset ${
      this.autoDrawDuration
    }ms ${this.autoDrawEasing}`
    path.style.strokeDashoffset = 0
    this.lastLength = length
  },

  method: {
    changePoint: function (point) {
      console.log('trend.js のchangePointが起動された')
      this.$emit('changePoint', point)
    }
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler () {
        this.$nextTick(() => {
          if (this.$isServer || !this.$refs.path || !this.autoDraw) {
            return
          }

          const maxMin = { max: this.max, min: this.min }
          this.points = genPoints(this.value, this.boundary, maxMin)
        })
      }
    }
  },

  render (h) {
    if (!this.value || this.value.length < 2) return
    const {
      width,
      height
    } = this

    const props = this.$props

    props.boundary = this.boundary
    props.id = 'vue-trend-' + this._uid
    props.height = height
    props.width = width
    props.points = this.points

    // https://jp.vuejs.org/v2/guide/render-function.html
    // ここにrenderのこと書いてある。
    return h(
      'svg', {
        attrs: {
          width: width || '100%',
          height: height || '25%',
          viewBox: `0 0 ${this.viewWidth} ${this.viewHeight}`
        }
      },
      [
        h(Gradient, {
          props
        }),
        h(Path, {
          props,
          ref: 'path'
        }),
        h(VerticalAxis, {
          props
        }),
        h(Points, {
          props
        })
      ]
    )
  }
}
