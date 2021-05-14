<template>
  <div>
    Users {{ users}}
  </div>
</template>

<script>
export default {
  name: 'Users',
  data(){
    return{
      users: []
    }
  },
  creted(){
    let app = this
    this.$socket.on('users', function(users) {
      console.log("users",users)
      this.users = users
      app.$store.commit("users", users)
    });
  }
}
</script>

<style>

</style>
