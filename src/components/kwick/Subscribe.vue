<template>
  <div>
    <GenericPopUp></GenericPopUp>
    <v-container>
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

        <v-text-field
          v-model="confirmPassWord"
          :rules="confirmPassWordRules"
          label="Confirmez votre mot de passe"
          type="password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          S'inscrire
        </v-btn>

        <v-btn
          color="warning"
          @click="resetValidation"
        >
          Réinitialiser
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>
<script>

// import { mapState } from 'vuex'
import GenericPopUp from '../shared/GenericPopUp'

export default {
  components:{GenericPopUp},
    // computed: {
    //     ...mapState ({
    //       subscribed: state => state.kwick.subscribed
    //     })
    //   },
    data: () => ({
      valid: true,
      id: '',
      passWord: '',
      confirmPassWord: '',
      idRules: [
        v => !!v || 'Le Prénom est obligatoire',
        v => (v && v.length >=2) || 'Au moins 2 caractères',
      ],
      
      passWordRules: [
        v => !!v || 'Le mot de passe est obligatoire',
        v => (v && v.length>=6) || 'Au moins 6 caractères',
      ],
      
      confirmPassWordRules: [
        v => !!v || 'Confirmez mot de passe est obligatoire',
        v => (v && v.length>=6) || 'Mot de passe non conforme',
      ]
    }),

    methods: {
      getData(){
        return {
          'user':this.id,
          'password':this.passWord
        }
      },
      validate () {
        this.$refs.form.validate()
        
        if((this.id&&this.passWord) == ''){
          this.$store.commit('kwick/setPopUp',{'status':true,'message':"Renseignez les champs SVP!"})
        }
        else if(this.passWord!=this.confirmPassWord){
          this.confirmPassWord='',
          this.$store.commit('kwick/setPopUp',{'status':true,'message':"Mot de passe n'est pas conforme"})
          
        }
        else {
          this.$store.dispatch('kwick/fetchSubscribe',this.getData())
          console.log(this.getData())
          }

      },
      resetValidation () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style>

</style>