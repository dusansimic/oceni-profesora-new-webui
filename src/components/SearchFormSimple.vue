<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <b-form-group
      id=fullNameInputGroup
      label="Ime i prezime:"
      label-for=fullNameInput>
      <b-form-input
        id=fullNameInput
        v-model="searchData.fullName"
        type=text
        aria-describedby="fullNameInputHelp fullNameInputFeedback"
        placeholder="Ime i prezime"
        :state="searchData.fullNameState"/>
      <b-form-invalid-feedback id=fullNameInputFeedback>
        Morate uneti samo ime i prezime
      </b-form-invalid-feedback>
      <b-form-text id=fullNameInputHelp>
        Unesite ime i prezime profesora
      </b-form-text>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: 'SearchFormSimple',
  data () {
    return {
      searchData: {
        fullName: null,
        fullNameState: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      (async () => {
        const profData = this.searchData.fullName.split(' ')
        this.searchData.fullNameState = profData.length && profData.length < 3

        const searchData = {}
        if (profData[0]) searchData.ime = profData[0]
        if (profData[1]) searchData.prezime = profData[1]

        this.$store.commit('getProfesors', searchData)
      })()

      e.preventDefault()
    },
    onReset (e) {
      e.preventDefault()
      this.searchData = {
        fullName: null,
        fullNameInput: null
      }
    }
  }
}
</script>
