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
    <!-- <path 
      d="M615.1,493c5.1,3.5,11.8-0.9,10.7-7l-7.7-40.4h72.1c49.6,0,89.8-40.2,89.8-89.8V102.5
		c0-49.6-40.2-89.8-89.8-89.8H109.8C60.2,12.7,20,52.9,20,102.5v253.3c0,49.6,40.2,89.8,89.8,89.8h436L615.1,493z">
    </path> -->
  </g>

</template>

<script>
// <svg xmlns='http://www.w3.org/2000/svg' height='66' width='220' viewBox='0 0 200 60' style='fill:#999999;stroke:#990000' ><!-- 背景色と枠線を指定 -->
//     <path d='M1,6 A6,6 0 0 1 6,1 L154,1 A6,6 0 0 1 160,6 L160,25 L175,45 L160,40 L160,42 A6,6 0 0 1 154,48 L6,48 A6,6 0 0 1 1,42  Z'></path><!-- pathで角丸の吹き出しを描く -->
//     <text x="80" y="35" text-anchor="middle">ＳＶＧで描く</text>
//   </svg><!-- textで中央基点に文字の開始位置を指定 -->
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
  },
  watch: {
      // point: {
      //   immediate: true,
      //   deep: true,
      //   handler () {
      //     this.$nextTick(() => {
      //       const targetElement = this.$el;
      //       const targetEl = targetElement.getBBox()
      //       const endX = targetEl.x + targetEl.width

      //       if (endX >= this.maxX){
      //         this.isOverWidth = true
      //       }
      //     })
      //   }
      // }
    }
}
</script>