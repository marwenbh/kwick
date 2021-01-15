<template>
  <v-app>
    <v-main>
      <!-- Affichage de l'entête -->
      <Header></Header>
      <!-- Affichage selon la route -->
      <router-view/>
      <!-- Affichage du pied de l'aplication -->
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>
// les import
import Footer from './components/footer/foot'
import Header from './components/header/Header'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  }
};
</script>
<style land="scss" scoped>
@import '../src/assets/scss/style.scss';
</style>
