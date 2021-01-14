<template>
  <v-container>
    <v-dialog
      v-model="popUp.status"
      width="500"
      class="text-center"
    >
        <v-card>
            <v-card-title class="headline red lighten-4">
                Erreur            
            </v-card-title>
            <v-card-text>
                {{popUp.message}}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="closePopUp()">Fermer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed:{
        ...mapState({
            popUp:state=>state.kwick.popUp
        }),
    },
    methods:{
        closePopUp(){
            this.$store.commit('kwick/setPopUp',{'status':false,'message':''})
        }
    }

}
</script>

<style>

</style>