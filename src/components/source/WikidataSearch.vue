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

        <vue-bootstrap-typeahead
        :data="items"
        v-model="itemSearch"
        size="lg"
        :serializer="s => s.match.text +' ('+s.description+')'"
        placeholder="type two letters for search on Wikidata"
        @hit="selectedItem = $event"
        />
        <!-- <b-input @change="change" placeholder="type two letters for search on Wikidata" @input="input" /> -->
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
      selectedItem: null,
      loading: false
    }
  },
  methods: {
    async getItems(query) {
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
    }
  }

}
</script>

<style>

</style>
