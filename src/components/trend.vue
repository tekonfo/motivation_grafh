<template>
  <div>
    <svg
      :width="'100%'" 
      :height="'100%'"
      :viewBox="viewBox"
      ref="motivationGraphSvg"
      style="background-color:#FFFFFF;"
    >

      <Gradient v-bind="{gradient, gradientDirection, id}"></Gradient>
      <VerticalAxis v-bind="{id, boundary, padding}"></VerticalAxis>
      <PathLine ref="path" v-bind="{path, id}"></PathLine>
      <Points v-bind="{boundary, points, allTextShow}" @changePoint="changePoint" ref="point"></Points>
      
    </svg>

    <v-bottom-navigation
    grow
    color="teal"
    >
      <v-switch v-model="allTextShow" label="text表示" />

      <v-btn @click="clearPoint">
        <span>全消去</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn @click="save">
        <span>画像出力</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>

      <v-btn>
        <span>シェア</span>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
  import PathLine from './path'
  import Gradient from './gradient'
  import VerticalAxis from './vartical'
  import Points from './points'
  import { genPoints, genPath } from '../helpers/path'
  import * as svg from 'save-svg-as-png';

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
        path: "",
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
        allTextShow: true,
        imageSrc: ""
      }
    },

    created: function () {
      this.viewWidth = this.width
      this.viewHeight = this.height
      this.boundary = {
        minX: this.padding.x,
        minY: this.padding.y,
        maxX: this.viewWidth - this.padding.x,
        maxY: this.viewHeight - this.padding.y
      }
    
      this.points = genPoints(this.value, this.boundary)
      this.path = genPath(this.points, this.smooth ? this.radius : 0)
      this.id = 'vue-trend-' + this._uid
    },

    mounted: function () {
      console.log('MOUNT LISTENER ON')
      this.$refs['motivationGraphSvg'].addEventListener('mouseup', this.$refs.point.mouseUp)
      this.$refs['motivationGraphSvg'].addEventListener('mousemove', this.$refs.point.move)
      this.$refs['motivationGraphSvg'].addEventListener('touchend', this.$refs.point.mouseUp)
      this.$refs['motivationGraphSvg'].addEventListener('touchmove', this.$refs.point.touchMove, {passive: false})
    },

    deforeDestroy: function () {
      console.log('MOUNT LISTENER OFF')
      this.$refs['motivationGraphSvg'].removeEventListener('mouseup',this.$refs.point.mouseUp)
      this.$refs['motivationGraphSvg'].removeEventListener('mousemove', this.$refs.point.move)
      this.$refs['motivationGraphSvg'].removeEventListener('touchend', this.$refs.point.mouseUp)
      this.$refs['motivationGraphSvg'].removeEventListener('touchmove', this.$refs.point.touchMove)
    },

    methods: {
      touchHandler: function () {
        console.log("test")
      },
      changePath: function () {
        const path = this.$refs.path.$el
        const length = path.getTotalLength()
        this.setPathStyle(path, length)
        this.lastLength = length
      },
      changePoint: function (point) {
        this.$emit('changePoint', point)
      },
      clearPoint: function () {
        this.$emit('clearPoint')
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
      },
      save: function () {
        svg.svgAsPngUri(this.$refs['motivationGraphSvg']).then(
          uri => this.$emit('outputImage', {url: uri})
        );
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

            this.path = genPath(this.points, this.smooth ? this.radius : 0) 
            
            // これ消すとオシャン描画になる
            // ゆったりとした描画になるけどバグ多めなのでとりあえず無視
            // this.changePath()
          })
        }
      }
    }
  }

</script>
