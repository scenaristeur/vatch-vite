import { createApp } from 'vue'
import App from './App.vue'
import "./js/socket.io.min.js"
window.socket = io(':3000');

createApp(App).mount('#app')
