<template>
  <div>
    <div id="mynetwork" class="network">N/A</div>
    <button @click="clusterByGroup">Cluster By group</button>

  </div>
</template>

<script>
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

export default {
  name: 'Network',
  // created(){
  //   this.localResources = this.$store.state.localResources
  //   console.log(this.localResources)
  // },
  mounted(){

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
            console.log("selected",n)
            console.log("socket",this.$socket)
            if (n.type == 'file'){
              this.$socket.emit('read file', n.id);
              n.shape = "ellipse"
              this.data.nodes.update(n)
            }else if (n.type == "folder"){
              n.shape = "box"
              this.data.nodes.update(n)
            }
          }
        }
      })

      // this.localResources = this.$store.state.localResources
      // console.log(this.localResources)

    },
    methods:{

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
          this.$socket.emit('read file', item.path);
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
        console.log("Resources in network",this.localResources)
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
  </style>
