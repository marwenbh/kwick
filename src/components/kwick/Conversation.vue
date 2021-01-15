<template>
  <v-container>
    <v-card>
      <v-card-title class="blue white--text">
        <span class="headline">Messages</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-responsive
        class="overflow-y-auto"
        max-height="400"
      >
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: .5
          }"
          min-height="200"
        >
          <v-card>
            <v-divider></v-divider>
            <v-list v-for="msg in messages" :key="msg.cpt" class="font-weight-bold mt-2 ml-2 mr-2">
              <v-card 
                elevation="18"
                shaped>     
                <v-card-title class="grey lighten-4">
                  <span>{{msg.message}}</span> 
                </v-card-title >
                <div class="d-flex"><strong>{{msg.user}}</strong><span>@{{msg.time}}</span></div>
              </v-card>
            </v-list>
          </v-card>
        </v-lazy>
      </v-responsive>
        <v-text-field
          v-model="message"
          :rules="messageRules"
          label="message"
          outlined
          clearable
          class="font-weight-bold mt-4 ml-2 mr-2"
          @keyup.enter="sendMessage()"
          lazy-validation
        ></v-text-field>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {

    data: () => ({
      isActive: false,
      message: ' ',
      messageRules: [
        v => (v.length <=140) || 'Maximum 140 caractères']
    }),
    computed:{
      ...mapState({
      messages:state=>state.kwick.messages,
      })
    },
    methods:{
      sendMessage(){
        if (this.message.length<=140){
        this.$store.dispatch('kwick/postMessage',this.message)
        this.message=''
        }
      }
    }
  }
</script>

<style>

</style>