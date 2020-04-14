<template>
<g>
  <line 
    :x1="x"
    :x2="x"
    :y1="boundary.maxY"
    :y2="boundary.minY"
  >
  </line>
  <text  
    :x="center"
    :y="boundary.maxY + 25"
    dominant-baseline="hanging"
    text-anchor="middle"
    fill="black" 
    >{{ title }}
    </text>
    <circle
    :cx="x" 
    :cy="boundary.maxY" 
    r="3" 
    />
</g>

</template>

<script>
export default {
  props: ['boundary', 'x', 'title'],
  computed: {
      centerLine: function () {
        return (this.boundary.maxY / 2)
      },
      center: function () {
        return this.boundary.minX + (this.x - this.boundary.minX) / 2
      }
  }
}
</script>