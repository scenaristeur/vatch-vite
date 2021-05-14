import Vue from 'vue';
import App from './App.vue';
import store from './store'

import VueSocket from './plugins/vue-socket';

// Load our IPFS plugin.
Vue.use(VueSocket);

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
