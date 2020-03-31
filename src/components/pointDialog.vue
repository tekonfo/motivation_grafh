<template>
  <v-row justify="center">
    <v-dialog v-model="isSelectedId" max-width="1000px">
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
              @click="deletePoint"
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
                @change="$emit('savePoint', point)"
                label="1行目"
              />
              <v-text-field
                v-model="point.secondText"
                @change="$emit('savePoint', point)"
                label="2行目"
              />
              <v-switch 
                v-model="point.isShowTextRight" 
                @change="$emit('savePoint', point)"
                label="テキスト右側表示" 
              />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('cancel')">閉じる</v-btn>
          <v-btn color="blue darken-1" text @click="savePoint">保存する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['isSelectedId', 'point'],
  methods: {
    savePoint: function () {
      this.$emit('savePoint', this.point)
      this.$emit('cancel')
    },
    deletePoint: function () {
      this.$emit('deletePoint', this.point.originX)
      this.$emit('cancel')
    },
  },
}
</script>