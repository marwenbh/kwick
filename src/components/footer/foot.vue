<template>
  <v-card height="300px">
    <v-footer
      fixed
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        class="blue lighten-1 text-center"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      padless: true
    })
  }
</script>