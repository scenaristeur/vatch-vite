//https://stfalcon.com/en/blog/post/chat-app-creation-vue.js-nuxt.js-node.js-socket.io-vue-socket.io-vuetify.js-technolog
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function () {
 Vue.use(new VueSocketIO({
   debug: false,
   connection: '/',
 }))
}
