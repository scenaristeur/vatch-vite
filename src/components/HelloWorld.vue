<template>
  <h1>{{ msg }}</h1>

  C
  <div class="chat">
    <div class="wrapper">
      <ul id="messages"></ul>
    </div>
  </div>
  D

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

//init
let pathsep='/' //  ... / for linux, \\ for Windows



socket.on('init', function(init) {
  console.log(init)

  pathsep = init.pathsep
  let item = document.createElement('li');
  item.textContent = init.welcome;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('chat message', function(msg) {
  console.log(msg)
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('watcher event', function(msg) {
  console.log(msg)
  //  process(msg)
  let item = document.createElement('li');
  item.textContent = JSON.stringify(msg);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('cat file', function(msg) {
  console.log(msg)
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  //  window.scrollTo(0, document.body.scrollHeight);

  // processFile(msg)
});

socket.on('connect', () => {
    let messages = document.getElementById('messages');
  console.log('user connected');
  document.body.style.backgroundColor = "rgba(11,156,49,0.1)"
});
socket.on('disconnect', () => {
  console.log('user disconnected');
  document.body.style.backgroundColor = "rgba(156,11,49,0.1)"
});



defineProps({
  msg: String
})

const state = reactive({ count: 0 })
console.log("Socket",socket)
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
