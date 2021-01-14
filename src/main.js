import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import VueJsonp from 'vue-jsonp'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VueMoment)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
