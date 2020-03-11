<template>
  <v-app id="inspire">
    
    <Navigation></Navigation>

    <Header></Header>

    <v-content>
      <v-container class="fill-height" fluid >
        <v-row>
          <v-col ref="parent" cols="12">
            <trend
              :value="points"
              :gradient="gradient"
              :height="500"
              :width="1000"
              :isMove="isMove"
              :selectedId="selecetedId"
              @changePoint="changePoint"
              >
            </trend>
          </v-col>

          <v-col cols="12">
            <controll
              :points="points"
            ></controll>
          </v-col>
      
          <v-col cols="12" lg="6" md="12" sm="12" v-for="point in points" v-bind:key="'input-' + point.originX">
            <v-card
              outlined
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{ point.originX }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <input v-model="point.text" @change="savePoint">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn @click="deletePoint(point.x)">削除</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        
        </v-row>

        <div class="twitter_share">
          <button @click="twitterShare">ツイッターでシェアする</button>
        </div>

      </v-container>
    </v-content>

    <Button @upDialog="dialog = true"></Button>

    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title>
          出来事追加
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-subheader class="pl-0">年齢</v-subheader>
              <v-slider
                v-model="x"
                thumb-label
                label="いつ？"
                :rules="[v => pointsX.indexOf(v) === -1 || '既に選択されています',]"
              ></v-slider>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="何が起きた？？？"
                v-model="text"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="addPoint()"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import Navigation from './layouts/navigation'
  import Header from './layouts/header'
  import Button from './layouts/button'
  import Trend from './components/trend'
  import Controll from './components/controll'

  const templatePoints = [
        { x: 0, y: 0, originX: 0,originY: 0,text: '誕生' },
        { x: 0, y: 0, originX: 1,originY: 100, text: '誕生' },
        { x: 0, y: 0, originX: 5,originY: 50,text: '誕生' },
        { x: 0, y: 0, originX: 10,originY: 10,text: '誕生' },
        { x: 0, y: 0, originX: 15,originY: 30,text: '誕生' },
        { x: 0, y: 0, originX: 20,originY: 0,text: '誕生' },
        { x: 0, y: 0, originX: 23,originY: 8,text: '誕生' }
      ]

  export default {
    name: 'App',

    components: {
      Trend,
      Controll,
      Navigation,
      Header,
      Button,
    },

    data: () => ({
      x: 0,
      text: "",
      isMove: false,
      selecetedId: 0,
      points: [],
      gradient: [],
      dialog: false,
      value: 30,
      rules: [
        v => v <= 40 || 'Only 40 in stock',
      ],
    }),
    created () {
      const pointsJson = localStorage.getItem('points')
      if (pointsJson) {
        this.points = JSON.parse(pointsJson)
      }else{
        this.points = templatePoints
      }
      this.gradient = ['#6fa8dc', '#42b983', '#2c3e50']
    },

    methods: {
      deletePoint: function (originX) {
        const index = this.points.findIndex((v) => v.originX === originX)
        this.points.splice(index, 1)
        this.savePoint()
      },
      savePoint: function () {
        localStorage.setItem('points', JSON.stringify(this.points))
      },
      addPoint: function () {
        const newPoint = { x: 0, y: 0, originX: this.x, originY: 50, text: this.text }
        const index = this.points.findIndex((v) => v.originX > this.x)
        // ない場合、末尾に挿入
        if (index === -1) {
          this.points.splice(this.points.length, 0, newPoint)
        } else {
          this.points.splice(index, 0, newPoint)
        }
        this.dialog = false
        this.savePoint()
      },
      changePoint: function (point) {
        const index = this.points.findIndex((v) => v.originX === point.originX)
        this.points.splice(index, 1, point)
        this.savePoint()
      },
      twitterShare(){
        var shareURL = 'https://twitter.com/intent/tweet?text=' + "ツイッターシェアボタンのサンプルコード" + "%20%23あめねこサンプルコード集" + '&url=' + "https://code.ameneko.com/twitter-share";  
        location.href = shareURL
      }
    },

    computed: {
      pointsX: function () {
        var pointsX = this.points.flatMap(function(point){
          return [ point.originX ]
        })
        return pointsX
      }
    }
  };
</script>
