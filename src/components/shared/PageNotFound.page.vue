<template>
  <v-container class="w-100 h-100 text-center">
    <div>
      <img src="../../assets/404NotFound.png">
    </div>
      <v-tooltip top
        color="indigo"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            class="px-4"
            dark
            icon
            color="red"
            routerLink to = "/kwick"
          >
            <v-icon></v-icon>
          </v-btn>
        </template>
        <span> {{ $t('app.actions.backToHome')}} </span>
      </v-tooltip>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

</style>
