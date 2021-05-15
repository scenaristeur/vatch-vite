<template>
  <form id="form" action="">
    <input id="input" autocomplete="off" /><button>Send</button>
  </form>
</template>

<script>
export default {
name: 'Input',
mounted(){
  let app = this
  let messages = document.getElementById('messages');
  let form = document.getElementById('form');
  let input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      app.$socket.emit('chat message', input.value);
      input.value = '';
    }
  });
}

}
</script>

<style>
#form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
#input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
#input:focus { outline: none; }
#form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }
</style>
