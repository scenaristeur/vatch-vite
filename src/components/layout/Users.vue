<template>
  <div>
    Users {{ users}}
  </div>
</template>

<script>
export default {
  name: 'Users',
  computed:{
    users:{
      get () { return this.$store.state.users},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>
