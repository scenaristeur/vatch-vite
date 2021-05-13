<template>
  <div>
    <div id="mynetwork" class="network">N/A</div>

    <div class="preview">
      <textarea id="content" rows="25" cols="50" style="display:none" >
      </textarea>
      <img id="image" width="425px" height="400px" style="display:none" />
      <br>
      <input id="path" autocomplete="off" />
      <button @click="save">Save</button>
      <button @click="clusterByGroup">Cluster By group</button>

    </div>

    <div class="chat">
      <div class="wrapper">
        <ul id="messages"></ul>
      </div>
    </div>
    <div class="doc">
      <!-- <a href="./babylon" >Baby</a> -->
      <a href="https://scenaristeur.github.io/ipgs/about" target="_blank">WAnt to CReate BIg MindMaps ? TRy Ipgs</a>
    </div>

    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>

  </div>
</template>

<script>
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

let socket = io();

export default {
  name: 'Network',
  mounted(){

    let messages = document.getElementById('messages');
    let form = document.getElementById('form');
    let input = document.getElementById('input');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });





    // create an array with nodes
    const nodes = new DataSet([
      { id: 1, label: "Node 1", group: "impaire" },
      { id: 2, label: "Node 2", group: "paire" },
      { id: 3, label: "Node 3",  group: "impaire" },
      { id: 4, label: "Node 4", group: "paire" },
      { id: 5, label: "Node 5",  group: "impaire" },
      { id: 6, label: "Node 6",  group: "paire" },
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ]);

    // create a network
    const container = document.getElementById("mynetwork");
    this.data = {
      nodes: nodes,
      edges: edges
    };
    const options = {
      interaction: {
        navigationButtons: true,
        //  keyboard: true,
      },
      edges : {arrows: 'to'}};
      this.network = new Network(container, this.data, options);



      this.network.on('selectNode', evt => {
        if (evt.nodes.length == 1) {
          if (this.network.isCluster(evt.nodes[0]) == true) {
            this.network.openCluster(evt.nodes[0]);
          }else{
            let n_id = evt.nodes[0]
            input.value = n_id
            let n = this.data.nodes.get(n_id);
            if (n.type == 'file'){
              socket.emit('read file', n.id);
              n.shape = "ellipse"
              this.data.nodes.update(n)
            }else if (n.type == "folder"){
              n.shape = "box"
              this.data.nodes.update(n)
            }
          }
        }
      })

      this.localResources = this.$store.state.localResources

    },
    methods:{
      save(){
        let content = document.getElementById("content").value
        let path = document.getElementById("path").value
        console.log(path, content)
        socket.emit('write file', {path: path, content: content});
      },
      /**
      * Extract given field from items array and return unique values in an array
      */
      fieldFromItems(items, field) {
        var tmpHash = {};
        for (var n in items) {
          tmpHash[items[n][field]] = true;
        }

        return Object.keys(tmpHash);
      },


      collectGroups() {
        var items = this.data.nodes.get({
          fields: ['group']
        });
        return this.fieldFromItems(items, 'group');
      },

      clusterByGroup(){
        // Determine all distinct group id's
        var groups = this.collectGroups();

        // Cluster per group
        for (var n in groups) {
          var group = groups[n];

          this.network.cluster({
            joinCondition: function(item) {
              return item.group == group;
            },
            clusterNodeProperties: {
              label: 'Group ' + group,
              borderWidth: 3,
              shape: "database",
              color: 'orange'
            }
          });
        }

      },

      process(msg){
        console.log("PROCESS",msg)
        msg.forEach((item, i) => {
          switch (item.event) {
            case "add":
            this.add(item)
            break;
            case "addDir":
            this.addDir(item)
            //  linkContainer(item)
            break;
            case "unlink":
            this.unlink(item)
            this.unlinkContainer(item)
            break;
            case "unlinkDir":
            this.unlinkDir(item)
            this.unlinkContainer(item)
            break;
            case "change":
            this.change(item)
            break;
            default:

          }
        });
        //  console.log(network)
      },

      //https://visjs.github.io/vis-data/data/dataset.html
      // https://visjs.github.io/vis-network/docs/network/manipulation.html
      // https://visjs.github.io/vis-network/docs/network/#methodManipulation

      add(item){
        let color = '#55D5E0'
        let label = item.path.split(this.pathsep).pop()
        this.data.nodes.update([{
          id: item.path, label:label, color:color, type: 'file', group: "file"
        }])
        this.linkContainer(item)
        if (label.startsWith('#')){
          socket.emit('read file', item.path);
        }

      },
      addDir(item){
        let p = item.path.split(this.pathsep)
        let color = p.length == 1 ? '#F26619' : '#F6B12D'
        this.data.nodes.update([{
          id: item.path, label:p.pop(),shape: 'box', color: color, type: 'folder', group: "folder"
        }])
        this.linkContainer(item)
      },
      unlink(item){
        this.data.nodes.remove(item.path);
      },
      unlinkDir(item){
        this.data.nodes.remove(item.path);
      },
      linkContainer(item){
        let splitted = item.path.split(this.pathsep)
        if (splitted.length > 1){
          let to = item.path
          splitted.pop()
          let from = splitted.join(this.pathsep)
          let exist_edge =  this.data.edges.get({
            filter: function (e) {
              return e.from == from && e.to == to && e.label == "contains";
            }
          });
          if(exist_edge.length == 0){
            let edge = {from: from, to: to, label: "contains"}
            this.data.edges.add([edge])
          }
        }
      },
      unlinkContainer(item){
        let splitted = item.path.split(this.pathsep)
        if (splitted.length > 1){
          let to = item.path
          splitted.pop()
          let from = splitted.join(this.pathsep)
          let edges_to_remove =  this.data.edges.get({
            filter: function (e) {
              return e.from == from && e.to == to && e.label == "contains";
            }
          });
          this.data.edges.remove(edges_to_remove)
        }
      },
      change(item){
        let n = this.data.nodes.get(item.path)
        n.shape = "star"
        this.data.nodes.update(n)
      }

    },
    watch:{
      localResources(){
        this.process(this.localResources)
      }
    },
    computed:{
      pathsep:{
            get () { return this.$store.state.pathsep},
            set (/*value*/) { /*this.updateTodo(value)*/ }
          },
      localResources:{
        get () { return this.$store.state.localResources},
        set (/*value*/) { /*this.updateTodo(value)*/ }
      }
    }
  }
  </script>

  <style>
  #mynetwork {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
  }
  /* body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; } */

  /*

  #messages { list-style-type: none; margin: 0; padding: 0; }
  #messages > li { padding: 0.5rem 1rem; }
  #messages > li:nth-child(odd) { background: #efefef; }
  .wrapper{
  // width: 1000px;
  width:600px;
  overflow-y:scroll;
  position:relative;
  height: 300px;
  } */

  #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
  #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
  #input:focus { outline: none; }
  #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

  </style>
