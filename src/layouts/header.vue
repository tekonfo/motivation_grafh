<template>
  <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
    <!-- <v-app-bar-nav-icon @click="drawer" /> -->
    <v-toolbar-title>
      <span>モチベーショングラフ</span>
    </v-toolbar-title>
    <v-spacer />

    <v-dialog
      v-model="dialog"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon>
          <v-icon v-on="on">mdi-help-circle</v-icon>
        </v-btn>
      </template>
      <help />
    </v-dialog>
    <v-btn
      icon
      large
    >
      <v-avatar
        size="32px"
        item
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        /></v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Help from './help'

export default {
  data: () => ({
    dialog: false
  }),
  components: {
    Help
  },
  methods: {
    drawer: function() {
      this.$emit('drawer');
    }
  }
}
</script>