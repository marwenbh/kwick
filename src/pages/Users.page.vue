<template>
  <div class="ml-2">
    <v-btn v-if="isLogOut==false" @click="logOut()"  color="error" class="mt-2">Déconnexion</v-btn>
      <v-col>
        <v-row no-gutters>
          <v-col  class="col-4" >
            <v-row class="mt-3">
              <v-card>
                <v-card-title class="blue white--text">
                  <span class="headline">Utilisateurs connectés</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                  <v-responsive
                    class="overflow-y-auto"
                    max-height="500"
                  >
                    <v-lazy
                      v-model="isActive"
                      :options="{
                        threshold: .5
                      }"
                      min-height="50"
                    >
                      <v-timeline
                        align-top
                        dense
                      >
                        <v-timeline-item
                          v-for="user in users"
                          :key="user"
                          small
                        >
                          <strong>{{ user}}</strong>
                        </v-timeline-item>
                      </v-timeline>
                    </v-lazy>
                  </v-responsive>
                </v-card-text>
              </v-card>
            </v-row>  
          </v-col >
          <v-col class="col-2">
            <v-select
              v-model="select"
              :items="items"
              label="Période"
              required
            ></v-select>
          </v-col >
          <v-col  class="col-6">
            <Conversation></Conversation>
          </v-col >
        </v-row>
      </v-col>
  </div>
</template>
<script src="https://unpkg.com/vue@2.2.4/dist/vue.js"></script>
<script>
// import
import { mapState } from 'vuex'
import Conversation from '../components/kwick/Conversation'
        
    export default {
      data () {
          return {
              right: null,
              isActive:false,
              items: [
                '10 minutes',
                '60 minutes',
                '12 heures',
                '24 heures',
                'Tout'
              ],
              select: null
            }
            
      },
      // appel de composants
      components:{Conversation},
      watch:{
        select(){
          this.getMessages()
        }
      },
      computed:{
          ...mapState({
              users:state=>state.kwick.users,
              messages:state=>state.kwick.messages,
              isLogOut:state=>state.kwick.isLogOut,
              
          })
      },
      methods:{
        logOut () {
          // Dispatche d'une action déclaré dans le store
          this.$store.dispatch('kwick/fetchLogOut')
          this.$router.push('kwick')
                 
        },
        getMessages(){
          console.log(this.select)
          switch(this.select){
            case 'tout':
              // Dispatcher une action de Store
              this.$store.dispatch('kwick/fetchTimeMessages','0')
              break
            case '10 minutes':
              this.$store.dispatch('kwick/fetchTimeMessages','600')
              break
            case '60 minutes':
              this.$store.dispatch('kwick/fetchTimeMessages','3600')
              break
            case '12 heures':
              this.$store.dispatch('kwick/fetchTimeMessages','43200')
              break
            case '24 heures':
              this.$store.dispatch('kwick/fetchTimeMessages','86400')
              break
            default:
              this.$store.dispatch('kwick/fetchTimeMessages','0')
          }
        }
      }
    }
</script>

<style>

</style>