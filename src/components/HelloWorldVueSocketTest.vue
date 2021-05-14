<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="pingServer()">Ping Server</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      isConnected: false,
      socketMessage: ''
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log('socket connected')
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
      console.log('socket disconnected')
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data
      console.log("message",data)
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    updatepathSep(msg){
      console.log("updatepathSep", msg)
    }
  },

  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', data)
    },
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!')
    }
  }
}
</script>

<style>

</style>
