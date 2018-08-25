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
  },
  blocked (state) {
    return state.object.email_verified === false
  },
  register (state, getters) {
    return (
      !getters.blocked &&
      (state.object.linux_user === null || state.object.linux_user === '')
    )
  }
}

const mutations = {
  initialize (state, { user }) {
    state.object = user
    state.initialized = true
  },
  merge (state, { data }) {
    state.object = { ...state.object, ...data }
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
