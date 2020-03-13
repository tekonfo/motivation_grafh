<template>
  <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
    <v-app-bar-nav-icon @click="drawer" />
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">モチベーショングラフ</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon>
      <v-icon v-on="on">mdi-help-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          ヘルプ
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            更に詳しく
          </v-btn>
        </v-card-actions>
      </v-card>
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
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    drawer: function() {
      this.$emit('drawer');
    }
  }
}
</script>