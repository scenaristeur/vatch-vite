import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: '',
    pathsep: '/', //  ... / for linux, \\ for Windows
    localResources : {},
    podResources: {},
    netWork: {}

  },
  mutations: {
    SOCKET_CONNECT(state) {
      console.log("connect")
      state.isConnected = true;
    },
    
    SOCKET_DISCONNECT(state) {
      console.log("disconnect")
      state.isConnected = false;
    },

    SOCKET_MESSAGECHANNEL(state, message) {
      console.log("message on channel")
      state.socketMessage = message
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
