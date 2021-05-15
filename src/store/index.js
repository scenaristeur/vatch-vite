import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pathsep: '/', //  ... / for linux, \\ for Windows
    users: [],
    localResources : [],
    podResources: {},
    netWork: {},
    user: null,
    chatMessages : [],
    file: {}
  },
  mutations: {
    setUser(state, u){
      console.log(u)
      state.user = u
    },
    setUsers(state, u){
      state.users = u
    },
    updatepathSep(state, p){
      state.pathsep = p
    },
    updateLocalResources(state, r){
      console.log(r)
      state.localResources = r
    },
    addChatMessage(state, m){
      state.chatMessages.push(m)
    },
    setFile(state, f){
      state.file = f
    }

  },
  actions: {
  },
  modules: {
  }
})
