<template>
  <v-container>
    <GenericPopUp></GenericPopUp>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="id"
        :rules="idRules"
        label="Identifiant"
        required
      ></v-text-field>
    
      <v-text-field
        v-model="passWord"
        :rules="passWordRules"
        label="Mot de passe"
        type="password"
        required
      ></v-text-field>

    <v-btn
    :disabled="!valid"
    color="success"
    class="mr-4"
    @click="validate"
    >
        Connexion
    </v-btn>
      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Réinitialiser
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import GenericPopUp from '../shared/GenericPopUp'
export default {
  components:{
    GenericPopUp
  },
    data: () => ({
      valid: true, 
      id: '',
      idRules: [
        v => !!v || 'Le Prénom est obligatoire',
        v => (v && v.length >=2) || 'Au moins 2 caractères',
      ],
      passWord: '',
      passWordRules: [
        v => !!v || 'Le mot de passe est obligatoire',
        v => (v && v.length >=6) || 'Minimum 6 caractères',
      ]
    }),
    computed:{
      ...mapState({
        loged:state=>state.kwick.loged
      })
    },
    watch:{
      loged(){
         this.$router.push('users')
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
        if((this.id&&this.passWord)!=''){
          this.$store.dispatch('kwick/fetchLogIn',this.getData())
        }
        else this.$store.commit('kwick/setPopUp',{'status':true,'message':"Les champs sont vides"})    
      },
      resetValidation () {
        this.$refs.form.reset()
      },
      getData(){
          return {
              'user':this.id,
              'password':this.passWord
          }
      }
    }
}
</script>

<style>

</style>