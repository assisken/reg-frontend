import axios from 'axios'

const state = {
  value: null
}

const getters = {}

const mutations = {
  update (state, { token }) {
    state.value = token
  },
  logout (state) {
    state.value = null
  }
}

const actions = {
  async getToken ({ commit }, { code }) {
    let resp = await axios
      .post('/api/login/', 'code=' + code)
      .catch(err => console.log(err))
    let token = resp.data.token
    commit('update', { token })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
