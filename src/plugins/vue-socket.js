
import "../js/socket.io.min.js"
//window.socket = io(':3000');

const plugin = {
  install(Vue, opts = {}) {
    console.log("opts",opts)
    let store = opts.store
    let socket = Vue.prototype.$socket = io(':3000');

    socket.on('init', function(init) {
      console.log('init',init)
      store.commit("updatepathSep", init.pathsep)
    });

    socket.on('users', function(users) {
      console.log("users",users)
      store.commit("setUsers", users)
    });

    socket.on('watcher event', function(ressources) {
      console.log("Watcher event",ressources)
      store.commit("updateLocalResources", ressources)
    });

    socket.on('cat file', function(file) {
      console.log("TODO PROCESSFILE cat file", file)
      store.commit("setFile", file)
    });

    socket.on('chat message', function(msg) {
      console.log('chat message',msg)
      store.commit("addChatMessage", msg)
    });

    socket.on('connect', () => {
      store.commit("setUser", socket.id)
    });
    socket.on('disconnect', () => {
      store.commit("setUser", null)
    });



  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
