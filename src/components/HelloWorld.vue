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
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
