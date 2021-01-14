<template>
  <v-app>
    <v-main>
      <v-card>
        <Header></Header>
        <router-view/>
        <Footer></Footer>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Footer from './components/footer/foot'
import Header from './components/header/Header'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  data: () => ({
  }),
};
</script>

<style land="scss" scoped>
@import '../src/assets/scss/style.scss';
</style>
