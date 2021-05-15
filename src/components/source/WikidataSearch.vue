<template>
  <div>
    <b-button v-b-modal.modal-wikidata-search>? Search Wikidata</b-button>

    <b-modal id="modal-wikidata-search">
      <template #modal-header="{ close }">

        <h5>Wikidata Search</h5>
        <b-spinner label="Loading..." v-if="loading==true"></b-spinner>
        <!-- Emulate built in modal header close button action -->
        <b-button size="sm" variant="outline-danger" @click="close()">
          Close Modal
        </b-button>
      </template>
      <p class="my-4">
        <a href="https://www.wikidata.org/w/index.php?title=Special%3ASearch&go=Go&ns0=1&ns120=1" target="_blank">Manual search</a>
        <vue-bootstrap-typeahead
        :data="items"
        v-model="itemSearch"
        size="lg"
        :serializer="s => s.match.text"
        placeholder="type two letters for search on Wikidata"
        @hit="selectedItem = $event">
        <!-- Append a button -->
        <!-- <template slot="append">

        <button @click="getItems" class="btn btn-primary">
        Search
      </button>
    </template> -->


    <template slot="suggestion" slot-scope="{ data }">

      <b class="md-2">{{ data.match.text}}&nbsp;</b>
      <small><i>{{data.description}}</i></small>
      <!-- <img
      class="rounded-circle"
      :src="data.avatar_url"
      style="width: 40px; height: 40px;" /> -->

      <!-- Note: the v-html binding is used, as htmlText contains
      the suggestion text highlighted with <strong> tags -->
      <!-- <span class="ml-4" v-html="htmlText"></span>
      <i class="ml-auto fab fa-github-square fa-2x"></i>  -->
    </template>
  </vue-bootstrap-typeahead>
  <a :href="conceptUri" target="_blank">{{ conceptUri }}</a>
</p>

</b-modal>
</div>
</template>

<script>
import _ from 'underscore'

const API_URL = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&origin=*&format=json'

export default {
  name: "WikidataSearch",
  components :  {
    'VueBootstrapTypeahead' :  () => import ( 'vue-bootstrap-typeahead' ),
  },
  created(){
    console.log(navigator.language)
    this.language = navigator.language.split("-")[0] || 'en'
  },
  data(){
    return {
      items: [],
      itemSearch: '',
      selectedItem: null,
      loading: false,
      conceptUri: ""
    }
  },
  methods: {
    async getItems(query) {
      //  this.conceptUri = ""
      if(query.length>0){
        this.loading = true
        let search_url = API_URL+"&language="+this.language+"&search="+query
        console.log(search_url)
        try{
          const res = await fetch(search_url)
          const suggestions = await res.json()
          console.log(suggestions)
          this.items = suggestions.search
          console.log(this.items)
        }catch(e){
          alert(e)
        }

        this.loading = false
      }
    },
    change(e) {
      console.log(e)
    },
    input(e) {
      console.log(e)
      //  let val = e.target.value
      // console.log(val)
      if (e.length > 1){
        let search_url = `http://www.wikidata.org/w/api.php
        &action=wbsearchentities
        &format=json
        &language=${this.language}
        &type=item
        &continue=0
        &search=${e}`
        console.log(search_url)
      }
    }
  },
  watch: {
    itemSearch: _.debounce(function(item) { this.getItems(item) }, 500),
    selectedItem(){
      console.log(this.selectedItem)
      this.conceptUri = this.selectedItem.concepturi
      console.log("conceptUri",this.conceptUri)
    }
  }

}
</script>

<style>

</style>
