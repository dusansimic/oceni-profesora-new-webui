import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profesorList: [],
    showSearchForm: true
  },
  mutations: {
    getProfesors (state, searchData) {
      (async () => {
        let query = ''

        if (searchData.ime) {
          query += `ime=${searchData.ime}`
        }
        if (searchData.prezime) {
          query += `${query !== '' ? '&' : ''}prezime=${searchData.prezime}`
        }
        if (searchData.jmbg) {
          query += `${query !== '' ? '&' : ''}jmbg=${searchData.jmbg}`
        }

        const response = await axios.get(`https://oceni-profesora.herokuapp.com/api/profesor?${query}`)

        state.profesorList = response.data
        state.showSearchForm = false
      })()
    }
  },
  actions: {

  }
})
