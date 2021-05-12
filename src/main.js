import Vue from 'vue';
import App from './App.vue';
import "./js/socket.io.min.js"
window.socket = io(':3000');

new Vue({
  render: (h) => h(App),
}).$mount('#app');
