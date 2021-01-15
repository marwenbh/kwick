<template>
  <v-container class="text-center">
    <div>
      <img src="../../assets/404NotFound.png">
    </div>
      <v-btn
        dark
        class="mt-4"
        color="red"
        routerLink to = "/kwick"
        @click="logOut()"
      >
      <v-icon>mdi-home</v-icon>
      </v-btn>
  </v-container>
</template>

<script>
export default {
  methods:{
    logOut(){
      this.$store.commit('logOut')
    }
  }
}
</script>
