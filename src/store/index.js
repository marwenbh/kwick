import Vue from 'vue'
import Vuex from 'vuex'

import kwick from './modules/kwick'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    kwick
  }
})

export default store