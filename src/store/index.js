import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pathsep: '/', //  ... / for linux, \\ for Windows
    localResources : {},
    podResources: {},
    netWork: {}

  },
  mutations: {
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
