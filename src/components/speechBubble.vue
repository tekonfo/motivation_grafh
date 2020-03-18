<template>
  <g>
    <text  
      :x="changeStartX"
      :y="point.y"
      fill="black"  
      :font-size="fontSize"
      :text-anchor="endOrStart"
      v-show="index === showTextId || allTextShow"
      >{{ point.text }}
    </text>
    <text  
      :x="changeStartX"
      :y="point.y + 20"
      fill="black"  
      :font-size="fontSize"
      :text-anchor="endOrStart"
      v-show="index === showTextId || allTextShow"
      >{{point.secondText}}
    </text>
  </g>
</template>

<script>
export default {
  props: ['point', 'allTextShow', 'showTextId', 'index', 'maxX'],
  data: function () {
    return {
      isOverWidth: false,
      fontSize: 11
    }
  },
  mounted: function () {
    // const targetElement = this.$el;
    // const targetEl = targetElement.getBBox()
    // const endX = targetEl.x + targetEl.width

    // if (endX >= this.maxX){
    //   this.isOverWidth = true
    // }
  },
  computed: {
    endOrStart: function () {
     return this.point.isShowTextRight ? 'start'  :  'end'
    },
    changeStartX: function () {
      return this.point.isShowTextRight ? this.point.x + 10  : this.point.x - 10
    }
  }
}
</script>