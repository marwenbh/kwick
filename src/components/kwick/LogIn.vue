<template>
  <v-container>
    <!-- Affichage selon le besoin -->
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
      // Règles de l'ID
      idRules: [
        v => !!v || 'Le Prénom est obligatoire',
        v => (v && v.length >=2) || 'Au moins 2 caractères',
      ],
      passWord: '',
      // Règles de mot de passe
      passWordRules: [
        v => !!v || 'Le mot de passe est obligatoire',
        v => (v && v.length >=6) || 'Minimum 6 caractères',
      ]
    }),
    //Computed: méthods exécutés lors d'un appel avec d'une mise à jour d'une variable
    computed:{
      ...mapState({
        loged:state=>state.kwick.loged
      })
    },
    //watch: exécuté si et seulement si la variable  se modifie
    watch:{
      loged(){
         this.$router.push('users')
      }
    },
    methods: {
      // Validation dy formulaire
      validate () {
        this.$refs.form.validate()
        if((this.id&&this.passWord)!=''){
          // tentative de connexion si les champs sont remplis
          this.$store.dispatch('kwick/fetchLogIn',this.getData())
        }
        // execution du popUp et revoi d'erreur
        else this.$store.commit('kwick/setPopUp',{'status':true,'message':"Les champs sont vides"})    
      },
      // Réinitialisation du formulaire
      resetValidation () {
        this.$refs.form.reset()
      },
      // Renvoi de coordonnées communiqués
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