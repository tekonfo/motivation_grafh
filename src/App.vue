<template>
  <v-app>
    <h1>モチベーショングラフ</h1>
    
    <trend
      :value="points"
      :gradient="gradient"
      :height="500"
      :width="1000"
      :isMove="isMove"
      :selectedId="selecetedId"
      auto-draw
      smooth>
    </trend>

    <controll
      :points="points"
    ></controll>

    一覧
    <div v-for="point in points" v-bind:key="'input-' + point.x">
      {{ point.x }}
      <input v-model="point.text">
      <button @click="deletePoint(point.x)">削除</button>
    </div>
    <input v-model="x">
    <button @click="addPoint(x)">追加</button>
  </v-app>
</template>

<script>
import Trend from './components/trend'
import Controll from './components/controll'
export default {
  name: 'App',

  components: {
    Trend,
    Controll
  },

  data: () => ({
    x: 0,
    isMove: false,
    selecetedId: 0,
    points: [],
    gradient: []
  }),
  created () {
    this.points = [
      { x: 0, y: 0, text: '誕生' },
      { x: 1, y: 100, text: '誕生' },
      { x: 5, y: 50, text: '誕生' },
      { x: 10, y: 10, text: '誕生' },
      { x: 15, y: 30, text: '誕生' },
      { x: 20, y: 0, text: '誕生' },
      { x: 23, y: 8, text: '誕生' }
    ]
    this.gradient = ['#6fa8dc', '#42b983', '#2c3e50']
  },
  methods: {
    deletePoint: function (x) {
      const index = this.points.findIndex((v) => v.x === x)
      this.points.splice(index, 1)
    },
    addPoint: function (x) {
      const newPoint = { x: x, y: 50, text: '' }
      const index = this.points.findIndex((v) => v.x > x)
      this.points.splice(index, 0, newPoint)
    },
    changePoint: function (x, y, text) {
      console.log('home.vue のchangePointが起動された')
      const point = { x: x, y: y, text: text }
      const index = this.points.findIndex((v) => v.x === x)
      // 置き換え
      this.points.splice(index, 1, point)
    }
  }
};
</script>
