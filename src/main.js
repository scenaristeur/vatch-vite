import { createApp } from 'vue'
import App from './App.vue'
import "./js/socket.io.min.js"
import store from './store'
window.socket = io(':3000');

createApp(App).use(store).mount('#app')
