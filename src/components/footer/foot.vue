<template>
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
        <!-- Récuperer l'année de la date actuelle -->
        {{ new Date().getFullYear() }} — <strong>Kwick</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      padless: true
    })
  }
</script>