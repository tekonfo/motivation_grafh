<template>
  <text  
    :x="point.x + 10"
    :y="point.y"
    fill="black"  
    v-show="index === showTextId || allTextShow"
    >{{ point.text }}
  </text>
</template>

<script>
// <svg xmlns='http://www.w3.org/2000/svg' height='66' width='220' viewBox='0 0 200 60' style='fill:#999999;stroke:#990000' ><!-- 背景色と枠線を指定 -->
//     <path d='M1,6 A6,6 0 0 1 6,1 L154,1 A6,6 0 0 1 160,6 L160,25 L175,45 L160,40 L160,42 A6,6 0 0 1 154,48 L6,48 A6,6 0 0 1 1,42  Z'></path><!-- pathで角丸の吹き出しを描く -->
//     <text x="80" y="35" text-anchor="middle">ＳＶＧで描く</text>
//   </svg><!-- textで中央基点に文字の開始位置を指定 -->
export default {
  props: ['point', 'allTextShow', 'showTextId', 'index']
}
</script>