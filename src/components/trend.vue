<template>
  <svg
    :width="'100%'" 
    :height="'100%'"
    :viewBox="viewBox"
  >
    <Gradient v-bind="{gradient, gradientDirection, id}"></Gradient>
    <VerticalAxis v-bind="{id, boundary, padding}"></VerticalAxis>
    <PathLine ref="path" v-bind="{smooth, radius, id, points}"></PathLine>
    <Points v-bind="{boundary, points}"></Points>
  </svg>
</template>

<script>
  import PathLine from './path'
  import Gradient from './gradient'
  import VerticalAxis from './vartical'
  import Points from './points'
  import { genPoints } from '../helpers/path'

  export default {
    components: {
      PathLine, Gradient, VerticalAxis, Points
    },

    props: {
      value: {
        type: Array,
        required: true
      },
      gradient: {
        type: Array,
        default: () => ['#000']
      },
      selectedId: Number,
      height: Number,
      width: Number,
      radius: {
        type: Number,
        default: 10
      },
      isMove: Boolean,
      smooth: Boolean
    },

    data: function () {
      return {
        id: "",
        points: [],
        boundary: [],
        viewWidth: 0,
        viewHeight: 0,
        padding: {
          x: 80,
          y: 40
        },
        autoDraw: true,
        autoDrawDuration: 2000,
        autoDrawEasing: 'ease',
        gradientDirection: 'top',
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
    
      this.points = genPoints(this.value, this.boundary)
      this.id = 'vue-trend-' + this._uid
    },

    mounted: function mounted () {
      // var pHeight = this.$el.parentNode
      // console.log(pHeight.clientHeight)
      const path = this.$refs.path.$el
      const length = path.getTotalLength()

      this.setPathStyle(path, length)

      this.lastLength = length
    },

    methods: {
      changePoint: function (point) {
        this.$emit('changePoint', point)
      },
      setPathStyle: function (path, length) {
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
      }
    },

    computed: {
      viewBox: function () {
        return [0, 0, this.viewWidth, this.viewHeight].join(' ')
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
            this.points = genPoints(this.value, this.boundary)
          })
        }
      }
    }
  }

</script>
