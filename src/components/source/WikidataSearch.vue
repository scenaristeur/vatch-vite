<template>
  <div>
    <b-button v-b-modal.modal-wikidata-search>? Search Wikidata</b-button>

    <b-modal id="modal-wikidata-search" title="Wikidata Search">
      <p class="my-4">
        <vue-bootstrap-typeahead
        :data="items"
        v-model="itemSearch"
        size="lg"
        :serializer="s => s.match.text"
        placeholder="type two letters for search on Wikidata"
        @hit="selectedItem = $event"
        />
        <b-input @change="change" placeholder="type two letters for search on Wikidata" @input="input" />
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
    this.language = navigator.language || 'en'
  },
  data(){
    return {
      items: [],
      itemSearch: '',
      selectedItem: null
    }
  },
  methods: {
    async getItems(query) {
      if(query.length>0){
        let search_url = API_URL+"&language="+this.language+"&search="+query
        console.log(search_url)
        const res = await fetch(search_url)
        const suggestions = await res.json()
        console.log(suggestions)
        this.items = suggestions.search
        console.log(this.items)
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
    itemSearch: _.debounce(function(item) { this.getItems(item) }, 500)
  }

}
</script>

<style>

</style>
