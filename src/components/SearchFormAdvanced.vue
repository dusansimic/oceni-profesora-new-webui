<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <b-form-group
      id=nameInputGroup
      label="Ime:"
      label-for="nameInput">
      <b-form-input
        id=nameInput
        type=text
        aria-describedby="nameInputHelp nameInputFeedback"
        v-model="searchData.name"
        required
        placeholder="Ime"
        :state="searchData.nameState"/>
      <b-form-invalid-feedback id=nameInputFeedback>
        Morate uneti samo ime
      </b-form-invalid-feedback>
      <b-form-text id=nameInputHelp>
        Unesite ime profesora
      </b-form-text>
    </b-form-group>
    <b-form-group
      id=surnameInputGroup
      label="Prezime:"
      label-for="surnameInput">
      <b-form-input
        id=surnameInput
        type=text
        aria-describedby="surnameInputHelp surnameInputFeedback"
        v-model="searchData.surname"
        required
        placeholder="Prezime"
        :state="searchData.surnameState"/>
      <b-form-invalid-feedback id=surnameInputFeedback>
        Morate uneti samo prezime
      </b-form-invalid-feedback>
      <b-form-text id=surnameInputHelp>
        Unesite prezime profesora
      </b-form-text>
    </b-form-group>
    <b-button type=submit variant=primary>Search</b-button>
    <b-button type=reset variant=danger>Reset</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'SearchFormAdvanced',
  data () {
    return {
      searchData: {
        name: null,
        nameState: null,
        surname: null,
        surnameState: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      (async () => { // eslint-disable-line no-unexpected-multiline
        this.searchData.nameState = this.searchData.name.split(' ').length === 1
        this.searchData.surnameState = this.searchData.surname.split(' ').length === 1

        this.$store.commit('getProfesors', {
          ime: this.searchData.name,
          prezime: this.searchData.surname
        })
      })()

      e.preventDefault()
    },
    onReset (e) {
      e.preventDefault()
      this.searchData = {
        name: null,
        nameState: null,
        surname: null,
        surnameState: null
      }
    }
  }
}
</script>
