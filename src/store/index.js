import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pathsep: '/', //  ... / for linux, \\ for Windows
    users: [],
    localResources : {},
    podResources: {},
    netWork: {}

  },
  mutations: {
    setUsers(state, u){
      state.users = u
    },
    updatepathSep(state, p){
      state.pathsep = p
    },
    updateLocalResources(state, r){
      state.localResources = r
    }

  },
  actions: {
  },
  modules: {
  }
})
