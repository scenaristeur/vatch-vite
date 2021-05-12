<template>
  <div>
    Network>
    <div>
      <div style="height:500px" id="mynetwork">N/A</div>
    </div>
  </div>
</template>

<script>
import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import "vis-network/styles/vis-network.css";

export default {
  name: 'Network',
  mounted(){
    // create an array with nodes
    const nodes = new DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" }
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
    const data = {
      nodes: nodes,
      edges: edges
    };
    const options = {};
    const network = new Network(container, data, options);
  }
}
</script>

<style>
#mynetwork {
  margin: 0px;
  padding: 0px;
}

#mynetwork {
  /* position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 50%; */
  /* min-height: 30vh; */
  border-right: 1px solid lightgray;
  /* background: green; */
}
</style>
