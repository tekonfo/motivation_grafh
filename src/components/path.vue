<template>
  <path :d="path" fill='none' :stroke="shapedUrl"></path>
</template>

<script>
export default {
  props: ['path', 'id'],
  computed: {
    shapedUrl: function () {
      return `url(#${this.id})`
    }
  },
}
</script>