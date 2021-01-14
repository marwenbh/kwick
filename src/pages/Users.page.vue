<template>
  <div >
    <v-btn v-if="isLogOut==false" @click="logOut"  color="error">Déconnexion</v-btn>
    <v-card >
      <v-col>
        <v-row no-gutters>
          <div class="col-2">
            <v-container>
              <v-row >
                <v-card>
                  <v-card-text>
                    <div class="font-weight-bold ml-8 mb-2">
                      Utilisateurs connectés
                    </div>
                    <v-timeline
                      align-top
                      dense
                    >
                      <v-timeline-item
                        v-for="user in users"
                        :key="user"
                        small
                      >
                        <div>
                          <div class="font-weight-normal">
                            <strong>{{ user}}</strong>
                          </div>
                        </div>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-container>
          </div>
          <div class="col-2">
            <v-select
              v-model="select"
              :items="items"
              label="Période"
              required
            ></v-select>
          </div>
          <div class="col-8">
            <Conversation></Conversation>
          </div>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>
<script src="https://unpkg.com/vue@2.2.4/dist/vue.js"></script>
<script>
import { mapState } from 'vuex'
import Conversation from '../components/kwick/Conversation'
        
    export default {
      data () {
          return {
              right: null,
              info:"",
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
          this.$store.dispatch('kwick/fetchLogOut')
          // this.$router.push('Kwick')
                 
        },
        getMessages(){
          console.log(this.select)
          switch(this.select){
            case 'tout':
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