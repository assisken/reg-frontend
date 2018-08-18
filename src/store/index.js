import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import user from './modules/user'
import token from './modules/token'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
const debug = false

const vuexPersist = new VuexPersistence({
  strict: debug,
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    user,
    token
  },
  strict: debug,
  mutations: { RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION },
  plugins: [vuexPersist.plugin]
})
