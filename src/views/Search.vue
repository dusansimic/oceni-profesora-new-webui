<template>
  <div>
    <br/>
    <b-container>
      <b-row>
        <b-col/>
        <b-col xl=6 lg=8 md=9 sm=8 cols=10>
          <b-button variant=dark @click="$store.state.showSearchForm = !$store.state.showSearchForm">{{ this.$store.state.showSearchForm ? 'Hide search' : 'Show search' }}</b-button>
          <b-collapse id=searchCollapse class="mt-2" v-model=$store.state.showSearchForm>
            <b-form-checkbox v-model="showAdvancedSearch" class="noselect">
              Prikaži napredno pretraživanje
            </b-form-checkbox>
            <SearchFormAdvanced v-if="showAdvancedSearch"/>
            <SearchFormSimple v-else/>
          </b-collapse>
        </b-col>
        <b-col/>
      </b-row>
      <b-row>
        <b-col/>
        <b-col xl=10 lg=11 md=10 sm=10 cols=10>
          <br/>
          <ProfesorList :profesors="this.$store.state.profesorList"/>
        </b-col>
        <b-col/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SearchFormAdvanced from '@/components/SearchFormAdvanced'
import SearchFormSimple from '@/components/SearchFormSimple'
import ProfesorList from '@/components/ProfesorList'

export default {
  name: 'search',
  components: {
    SearchFormAdvanced,
    SearchFormSimple,
    ProfesorList
  },
  data () {
    return {
      showAdvancedSearch: false
    }
  }
}
</script>
