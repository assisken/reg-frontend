import axios from 'axios'

const state = {
  object: {},
  initialized: false
}

const getters = {
  getUser (state) {
    return state.object
  },
  isInitialized (state) {
    return state.initialized
  }
}

const mutations = {
  initialize (state, { user }) {
    state.object = user
    state.initialized = true
  },
  logout (state) {
    state.object = {}
    state.initialized = false
  }
}

const actions = {
  async getUser ({ commit }, { token }) {
    let resp = await axios
      .get('/api/profile/', { headers: { Authorization: 'Token ' + token } })
      .catch(() => {})
    let user = resp.data
    commit('initialize', { user })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
