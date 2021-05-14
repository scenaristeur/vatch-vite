
import "../js/socket.io.min.js"
//window.socket = io(':3000');

const plugin = {
  install(Vue, opts = {}) {
    Vue.prototype.$socket = io(':3000');
  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
