<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="lr in localResources" :key="lr.path">
        {{lr.path}}
      </b-list-group-item>

    </b-list-group>
    {{ localResources}}
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
