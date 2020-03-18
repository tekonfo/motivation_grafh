<template>
  <v-app id="inspire">

    <!-- <Navigation :drawer="drawer"></Navigation> -->

    <Header @drawer="openClose"></Header>

    <ImageDialog 
      :imageDialog="imageDialog"
      :imageUrl="imageUrl"
      @cancel="imageDialog = !imageDialog"
    />

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
              @clearPoint="clearPoint"
              @outputImage="showImage"
              >
            </trend>
          </v-col>

          <v-col cols="12" lg="6" md="12" sm="12" v-for="point in points" v-bind:key="'input-' + point.originX">
            <v-card
              outlined
            >
              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-content>
                    <v-list-item-title>{{ point.originX }}才</v-list-item-title>
                  </v-list-item-content>
                  <v-btn 
                    icon
                    @click="deletePoint(point.originX)"
                  >
                    <v-icon large>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-list-item>  
              </v-card-actions>
              <v-list-item>
            
                <v-list-item-content>
                
                  <v-list-item-subtitle>
                    <v-text-field
                      v-model="point.text"
                      @change="savePoint"
                      label="1行目"
                    />
                    <v-text-field
                      v-model="point.secondText"
                      @change="savePoint"
                      label="2行目"
                    />
                    <v-switch 
                      v-model="point.isShowTextRight" 
                      label="テキスト右側表示" 
                    />
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

        </v-row>
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
                placeholder="1行目"
                v-model="text"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="2行目"
                v-model="secondText"
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

    <Footer />
  </v-app>
</template>

<script>
  import Header from './layouts/header'
  import Button from './layouts/button'
  import Footer from './layouts/footer'
  import Trend from './components/trend'
  import ImageDialog from './components/imageDialog'

  const templatePoints = [
        { x: 0, y: 0, originX: 12,originY: 80, text: '小学校時代。', secondText: '毎日楽しい', isShowTextRight: true   },
        { x: 0, y: 0, originX: 13,originY: 30, text: '中学校・バスケ部入部　顧問が怖くて毎日震える', secondText: 'バスケ漬けの毎日', isShowTextRight: true },
        { x: 0, y: 0, originX: 14,originY: 100, text: '市の選抜選手に選ばれる！', secondText: '', isShowTextRight: false },
        { x: 0, y: 0, originX: 15,originY: 100, text: '高校第一志望入学・初めの彼女ができる' , secondText: '毎日楽しい', isShowTextRight: true},
        { x: 0, y: 0, originX: 18,originY: 10, text: '第一志望に落ちる。。。浪人生活突入', secondText: '一日8時間勉強' , isShowTextRight: true},
        { x: 0, y: 0, originX: 19,originY: 90, text: '第一志望合格！！！華の大学生活へ', secondText: '', isShowTextRight: false },
        { x: 0, y: 0, originX: 20,originY: 60, text: 'RubyOnRailsでWeb開発を始める', secondText: '', isShowTextRight: true },
        { x: 0, y: 0, originX: 22,originY: 80, text: 'Web開発にのめり込む', secondText: '色々インターンに行く', isShowTextRight: false },
        { x: 0, y: 0, originX: 23,originY: 90, text: '京大大学院合格', isShowTextRight: false },
      ]

  export default {
    name: 'App',

    components: {
      Trend,
      Header,
      Button,
      ImageDialog,
      Footer
    },

    data: () => ({
      imageDialog: false,
      imageUrl: "",
      x: 0,
      text: "",
      secondText: "",
      isMove: false,
      selecetedId: 0,
      points: [],
      gradient: [],
      dialog: false,
      value: 30,
      drawer: false
    }),

    created () {
      const pointsJson = localStorage.getItem('points')
      if (pointsJson) {
        this.points = JSON.parse(pointsJson)
      }else{
        this.points = templatePoints
      }
      this.points = templatePoints
      this.gradient = ['#6fa8dc', '#42b983', '#2c3e50']
    },

    methods: {
      deletePoint: function (originX) {
        const index = this.points.findIndex((v) => v.originX === originX)
        this.points.splice(index, 1)
        this.savePoint()
      },
      clearPoint: function () {
        this.points = []
        localStorage.removeItem('points')
      },
      savePoint: function () {
        localStorage.setItem('points', JSON.stringify(this.points))
      },
      addPoint: function () {
        const newPoint = { x: 0, y: 0, originX: this.x, originY: 50, text: this.text, secondText: this.secondText }
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
      },
      openClose: function () {
        this.drawer = !this.drawer;
      },
      showImage: function (data) {
        this.imageUrl = data.url
        this.imageDialog = true
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
