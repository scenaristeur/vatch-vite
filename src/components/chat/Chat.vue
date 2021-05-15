<template>
  <div>
    Chat
    {{ chatMessages }}
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
export default {
  name: 'Chat',
  watch:{
    chatMessages(){
      console.log("TODO",this.chatMessages)
      //  this.processFile(this.file)
    }
  },
  computed:{
    chatMessages:{
      get () { return this.$store.state.chatMessages},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>
#messages { list-style-type: none; margin: 0; padding: 0; }
#messages > li { padding: 0.5rem 1rem; }
#messages > li:nth-child(odd) { background: #efefef; }
.wrapper{
  width: 1000px;
  width:600px;
  overflow-y:scroll;
  position:relative;
  height: 300px;
}
</style>
