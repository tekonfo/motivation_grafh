<template>
  <g>

    <Bubble 
    v-for="(point, index) in points" v-bind:key="'bubble-' + index" 
    :point="point"
    :maxX="boundary.maxX"
    :index="index"
    :allTextShow="allTextShow"
    :showTextId="showTextId"
    ></Bubble>
    
    <text v-for="(d, index) in points" v-bind:key="'axis-' + index" 
    :x="d.x"
    :y="centerLine + 5"
    dominant-baseline="hanging"
    text-anchor="middle" 
    fill="black" 
    >{{ d.originX }}
    </text>


    <circle v-for="(d, index) in points" v-bind:key="index" 
    :cx="d.x" 
    :cy="d.y" 
    r="5" 
    :fill="index===selectedId ? 'red' : 'black'"
    @mousedown="setId($event, index)"
    @touchstart="setId($event, index)"
    >
    <!-- @mouseover="showText($event, index)"
    @mouseleave="closeText($event)" -->
    </circle>

  </g>
</template>

<script>
  import { toOriginY } from '../helpers/path'
  import Bubble from './speechBubble'

  export default {
    props: ['boundary', 'points', 'allTextShow'],

    components: {
      Bubble
    },

    data: function () {
      return {
        beforeMouseY: 0,
        isMove: false,
        selectedId: -1,
        showTextId: -1,
        fill: 'red'
      }
    },

    updated: function () {
      // var svgz = require("svg-z-order")

      // var point = this.$refs.point
      // var svgzPoint = svgz.element(point)
      // console.log(svgzPoint)
      // svgzPoint.toTop()
    },

    computed: {
      centerLine: function () {
        return (this.boundary.maxY / 2)
      }
    },

    methods: {
      setId: function (event, index) {
        console.log('mouseDown')
        this.isMove = true
        this.selectedId = index
        event.preventDefault()
      },
      showText: function (event, index) {
        this.showTextId = index
        event.preventDefault()
      },
      closeText: function (event) {
        this.showTextId = -1
        event.preventDefault()
      },
      // move中は前回まで動かした差分を取りながら座標を変化させていく
      move: function (event) {
        if (!this.isMove) return
        console.log('move')
        var mouseY = event.offsetY
        this.calcY(mouseY)
        event.preventDefault()
      },
      touchMove: function (event) {
        if (!this.isMove) return
        console.log('move')
        var mouseY = event.changedTouches[0].pageY;
        this.calcY(mouseY)
        event.preventDefault()
      },
      calcY: function (y) {
        var dy = 0
        if (this.beforeMouseY) {
          dy = y - this.beforeMouseY
        }
        this.beforeMouseY = y
        var tempY = dy + Number(this.points[this.selectedId].y)
        if (tempY > 0 && tempY > this.boundary.minY && tempY < this.boundary.maxY) this.points[this.selectedId].y = tempY
      }
      ,
      // ポイントの値の変更を行う
      changePoint: function () {
        if (this.selectedId === -1){
          return
        }
        var point = this.points[this.selectedId]
        point.originY = toOriginY(point.y, {minY: this.boundary.minY, maxY: this.boundary.maxY})
        this.$emit('changePoint', point)
      },
      // マウスのクリックが終わった段階で初期化
      mouseUp (e) {
        console.log('mouseUp')
        this.changePoint()
        this.selectedId = -1
        this.isMove = false
        this.beforeMouseX = null
        this.beforeMouseY = null
        e.preventDefault()
      }
    }
  }
</script>





