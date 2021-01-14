<template>
  <v-container>
    <v-card>
      <!-- <v-list-item-title class="font-weight-bold" >
      Messages
      </v-list-item-title > -->
      <div class="font-weight-bold ml-8 mb-2">
        Messages
      </div>
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
                elevation="24"
                shaped>     
                <v-card-title class="grey lighten-4">
                  <strong>{{msg.user}}</strong>
                </v-card-title>
                  <v-card>{{msg.message}}</v-card>
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
      message: '',
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