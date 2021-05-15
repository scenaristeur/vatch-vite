<template>
  <div>
    Editor
    <div class="preview">
      <b-textarea id="content" rows="25" cols="50">
      </b-textarea>
      <b-img id="image" width="425px" height="400px"/>
      <br>
      <b-input id="path" autocomplete="off" />
      <b-button @click="save">Save</b-button>
      <div class="doc">
        <!-- <a href="./babylon" >Baby</a> -->
        <a href="https://scenaristeur.github.io/ipgs/about" target="_blank">WAnt to CReate BIg MindMaps ? TRy Ipgs</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  methods: {
    save(){
      let content = document.getElementById("content").value
      let path = document.getElementById("path").value
      console.log(path, content)
      this.$socket.emit('write file', {path: path, content: content});
    },
    processFile(msg){
      if(msg.error){
        alert("Error: ",msg.error)
        return
      }
      if (msg.type == undefined){
        msg.ext = msg.path.split('.').pop()
      }
      //console.log(msg)
      // try{
      document.getElementById("path").value = msg.path
      document.getElementById('image').style.display = "none"
      document.getElementById('content').style.display = "block"
      document.getElementById("content").value = msg.content
      // if (msg.type == "application/json" || msg.ext =="json"){
      //   console.log("TYPEOF" , typeof msg.content)
      //   // let cont = JSON.parse(msg.content)
      //   // console.log("Cont",cont)
      // //  msg.content = JSON.parse(msg.content) || msg.content
      // }else
      if(msg.type != undefined && msg.type.mime != undefined && msg.type.mime.split('/')[0] == 'image'){
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

      // msg.content.nodes != undefined ? this.data.nodes.update(msg.content.nodes) : ""
      // msg.content.edges != undefined ? this.data.edges.update(msg.content.edges) : ""
      //
      // this.data.edges.forEach((e) => {
      //   if (e.label == "a"){
      //     this.data.nodes.get(e.from).group = e.to
      //   }
      // });
      //
      // }catch(e){
      //   console.log(e)
      // }

    }
  },
  watch:{
    file(){
      console.log(this.file)
      this.processFile(this.file)
    }
  },
  computed:{
    file:{
      get () { return this.$store.state.file},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
