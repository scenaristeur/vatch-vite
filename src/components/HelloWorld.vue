<template>
  <div>

    <h1>{{ msg }}</h1>

    <div class="chat">
      <div class="wrapper">
        <ul id="messages">
          <li>!!! USER NOT CONNECTED !!!</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>

//init
let pathsep='/' //  ... / for linux, \\ for Windows
import "../js/socket.io.min.js"
let socket = io(':3000');
console.log(socket)

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  mounted(){

    socket.on('init', function(init) {
      console.log(init)

      pathsep = init.pathsep
      let item = document.createElement('li');
      item.textContent = init.welcome+ " "+init.users+ " users"
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
      messages.innerHTML = ""
      console.log('user connected');
      document.body.style.backgroundColor = "rgba(11,156,49,0.1)"
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
      document.body.style.backgroundColor = "rgba(156,11,49,0.1)"
      messages.innerHTML = "!!! USER NOT CONNECTED !!!"
    });
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
