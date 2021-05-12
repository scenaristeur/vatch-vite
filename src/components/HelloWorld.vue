<template>
  <div>

    <h1>{{ msg }}</h1>

    <b-container>
      <b-card class="row" title="NetworkBrowser>">
        <Network />
      </b-card>
      <b-row>
        <b-card class="col" title="LocalBrowser>">
          <LocalBrowser />
        </b-card>
        <b-card class="col" title="PodBrowser>">
          <PodBrowser />
        </b-card>
      </b-row>

    </b-container>
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
  components :  {
    'LocalBrowser' :  () => import ( './browser/LocalBrowser.vue' ),
    'PodBrowser' :  () => import ( './browser/PodBrowser.vue' ),
    'Network' :  () => import ( './browser/Network.vue' ),
  },
  data() {
    return {
      count: 0,
    };
  },
  mounted(){
    let app = this
    socket.on('init', function(init) {
      console.log('init',init)

      pathsep = init.pathsep
        app.$store.commit("updatepathSep", pathsep)
      let item = document.createElement('li');
      item.textContent = init.welcome+ " "+init.users+ " users"
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('chat message', function(msg) {
      console.log('chat message',msg)
      let item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('watcher event', function(msg) {
      console.log("Watcher event",msg)
      //  process(msg)
      app.$store.commit("updateLocalResources", msg)
      let item = document.createElement('li');
      item.textContent = JSON.stringify(msg);
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('cat file', function(msg) {
      console.log("cat file", msg)
      let item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      //  window.scrollTo(0, document.body.scrollHeight);

      this.processFile(msg)
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
  },
  methods: {
    processFile(msg){
    if(msg.error){
      alert("Error: ",msg.error)
      return
    }
    if (msg.type == undefined){
      msg.ext = msg.path.split('.').pop()
    }
    //console.log(msg)
    try{
      document.getElementById("path").value = msg.path
      document.getElementById('image').style.display = "none"
      document.getElementById('content').style.display = "block"
      document.getElementById("content").value = msg.content
      if (msg.type == "application/json" || msg.ext =="json"){
        msg.content = JSON.parse(msg.content)
      }else if(msg.type != undefined && msg.type.mime != undefined && msg.type.mime.split('/')[0] == 'image'){
        //console.log(msg.content)
        let src= 'data:'+msg.type.mime+';base64,' + msg.content;
        //console.log("image",src)
        document.getElementById('image').src = src
        document.getElementById('image').style.display = "block"
        document.getElementById('content').style.display = "none"

        // let ctx = document.getElementById('canvas').getContext('2d');
        // let img = new Image();
        // //let src= 'data:'+msg.type.mime+',' + msg.content;
        // console.log("src",src)
        // img.src = src
        // ctx.drawImage(img, 0, 0);
        // console.log(ctx)

      }else{
        console.log(msg)
      }

      msg.content.nodes != undefined ? nodes.update(msg.content.nodes) : ""
      msg.content.edges != undefined ? edges.update(msg.content.edges) : ""

      edges.forEach((e) => {
        if (e.label == "a"){
          nodes.get(e.from).group = e.to
        }
      });

    }catch(e){
      console.log(e)
    }

  }
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
