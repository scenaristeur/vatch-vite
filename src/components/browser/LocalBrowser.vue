<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="(lr, i) in localResources" :key="i">
        {{lr}}
      </b-list-group-item>

    </b-list-group>
    <!-- {{ localResources}} -->
  </div>
</template>

<script>
export default {
  name: 'LocalBrowser',
  computed:{
    localResources:{
      get () { return this.$store.state.localResources},
      set (/*value*/) { /*this.updateTodo(value)*/ }

    }
  }
}
</script>

<style>

</style>
