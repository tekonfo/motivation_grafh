<template>
  <v-row justify="center">
    <v-dialog v-model="imageDialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text>
          <v-img :src="imageUrl" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('cancel')">閉じる</v-btn>
          <v-btn color="blue darken-1" text @click="saveImage">保存する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['imageDialog', 'imageUrl'],
  methods: {
    saveImage: function () {
        //保存させたい場合（ダウンロードっぽくさせたい場合）
        let link = document.createElement('a')
        link.href = this.imageUrl
        link.download = 'download-filename.png'
        link.click()
        this.$emit('cancel')
    }
  }
}
</script>