import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localResources : {},
    podResources: {},
    netWork: {}

  },
  mutations: {
    updateLocalResources(state, r){
      state.localResources = r
    }
  },
  actions: {
  },
  modules: {
  }
})
