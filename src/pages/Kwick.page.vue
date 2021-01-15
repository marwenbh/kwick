<template>
  <v-container>
    <v-btn class="mr-4" v-if="!isLogIn" @click="logIn()" color="primary">Connexion </v-btn>
    <v-btn class="mr-4" v-if="!isSubscribe" @click="subscribe()" color="success">S'inscrire</v-btn>
    <Subscribe v-if="isSubscribe && !isLogIn"></Subscribe>
    <SuccessSubscribe v-if="subscribed"></SuccessSubscribe>
    <LogIn v-if="isLogIn && !isSubscribe"></LogIn>
  </v-container>
</template>

<script>
// import
import Subscribe from '../components/kwick/Subscribe'
import LogIn from '../components/kwick/LogIn'
import SuccessSubscribe from '../components/kwick/SuccessSubscribe'
import { mapState } from 'vuex'

  export default {
  
    

    components: { 
      Subscribe,
      LogIn,
      SuccessSubscribe
    },
    computed: {
      ...mapState ({
        subscribed: state => state.kwick.subscribed,
        isSubscribe: state => state.kwick.isSubscribe,
        isLogIn: state => state.kwick.isLogIn,
        isLogOut: state => state.kwick.isLogOut
      })
    },
    
    data: () => ({

    }),
    methods :{
      logIn () {
        this.$store.commit('kwick/logIn')
      },
      subscribe () {
        this.$store.commit('kwick/subscribe')
        this.$store.commit('kwick/setSubscribed', false)
      }
    }
  }
</script>
