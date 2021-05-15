<template>
  <div>

    <h1>{{ msg }}</h1>

    <b-container>
      <b-card class="row" title="NetworkBrowser>">
        <Network />
      </b-card>

      <b-row>
        <Users />
        <WikidataSearch />
        <Input />
        <Editor class="col" />
        <Chat class="col" />

      </b-row>
      <b-row>
        <b-card class="col" title="LocalBrowser>">
          <LocalBrowser />
        </b-card>
        <b-card class="col" title="PodBrowser>">
          <PodBrowser />
        </b-card>
      </b-row>

    </b-container>


  </div>
</template>

<script>

//init
let pathsep='/' //  ... / for linux, \\ for Windows
// import "../js/socket.io.min.js"
// let socket = io(':3000');
// console.log(socket)
import Network from './browser/Network.vue'


export default {
  props: {
    msg: String,
  },
  components :  {
    Network,
    'LocalBrowser' :  () => import ( './browser/LocalBrowser.vue' ),
    'PodBrowser' :  () => import ( './browser/PodBrowser.vue' ),

    'Chat' :  () => import ( './chat/Chat.vue' ),
    'Input' :  () => import ( './input/Input.vue' ),
    'WikidataSearch' :  () => import ( './source/WikidataSearch.vue' ),
    'Users' :  () => import ( './layout/Users.vue' ),
    'Editor' :  () => import ( './editor/Editor.vue' ),
  },
  watch:{
    user(){
      document.body.style.backgroundColor = this.user == null ? "rgba(156,11,49,0.1)" : "rgba(11,156,49,0.1)"
    }
  },
  computed:{
    user:{
      get () { return this.$store.state.user},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
