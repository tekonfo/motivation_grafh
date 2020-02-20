<template>
  <v-app id="inspire">
    
    <Navigation></Navigation>

    <Header></Header>

    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center" >
          <v-col cols="12">
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
          </v-col>

          <v-col cols="12">
            <controll
              :points="points"
            ></controll>
          </v-col>
      
          <v-col cols="6" v-for="point in points" v-bind:key="'input-' + point.x">
            <v-card
              outlined
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{ point.x }}</v-list-item-title>
                  <v-list-item-subtitle><input v-model="point.text"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn @click="deletePoint(point.x)">削除</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1"><input v-model="x"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn @click="addPoint(x)">追加</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        
        </v-row>
      </v-container>
    </v-content>

    <Button></Button>
  </v-app>
</template>

<script>
  import Navigation from './layouts/navigation'
  import Header from './layouts/header'
  import Button from './layouts/button'
  import Trend from './components/trend'
  import Controll from './components/controll'
  export default {
    name: 'App',

    components: {
      Trend,
      Controll,
      Navigation,
      Header,
      Button
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
