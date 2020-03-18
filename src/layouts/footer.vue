<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
        href="https://forms.gle/8waebCGDA4b9g5fu9"
        target="_blank"
      >
        ご意見フォーム
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — モチベーショングラフ
      </v-col>
    </v-row>
  </v-footer>
</template>