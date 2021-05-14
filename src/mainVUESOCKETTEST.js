import Vue from 'vue';
import App from './App.vue';
import store from './store'

//import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

//export const SocketInstance = socketio(':3000');

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
  //  options: { path: "/my-app/" } //Optional options
}))

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
