<template>
  <div>
    <b-row>
      <b-col/>
      <b-col xl=6 lg=8 md=9 sm=8 cols=10>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id=profesorNameGroup
            label="Ime:"
            label-for=profesorName
            description="Unesite ime profesora.">
              <b-form-input
                id=profesorName
                type=text
                v-model="profesorData.name"
                required
                placeholder="Ime"
                :state="profesorData.nameValid"/>
          </b-form-group>

          <b-form-group
            id=profesorSurnameGroup
            label="Prezime:"
            label-for=profesorSurname
            description="Unesite prezime profesora.">
              <b-form-input
                id=profesorSurname
                type=text
                v-model="profesorData.surname"
                required
                placeholder="Prezime"
                :state="profesorData.surnameValid"/>
          </b-form-group>

          <b-form-group
            id=profesorJMBGGroup
            label="JMBG:"
            label-for=profesorJMBG
            description="Unesite JMBG profesora.">
              <b-form-input
                id=profesorJMBG
                type=text
                v-model="profesorData.jmbg"
                required
                placeholder="JMBG"
                :state="profesorData.jmbgValid"/>
          </b-form-group>
          <b-button type=submit variant=primary>Dodaj profesora</b-button>
          <b-button type=reset variant=danger>Reset</b-button>
        </b-form>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddProfesor',
  data () {
    return {
      profesorData: {
        name: '',
        nameValid: null,
        surname: '',
        surnameValid: null,
        jmbg: '',
        jmbgValid: null
      }
    }
  },
  watch: {
    'profesorData.name': function (name) {
      this.profesorData.nameValid = name === '' ? null : name.length > 0
    },
    'profesorData.surname': function (surname) {
      this.profesorData.surnameValid = surname === '' ? null : surname.length > 0
    },
    'profesorData.jmbg': function (jmbg) {
      this.profesorData.jmbgValid = jmbg === '' ? null : jmbg.length === 13
    }
  },
  methods: {
    onSubmit (e) {
      (async () => {
        await axios.post(`https://oceni-profesora.herokuapp.com/api/profesor`, {
          ime: this.profesorData.name,
          prezime: this.profesorData.surname,
          jmbg: this.profesorData.jmbg
        })

        this.$router.push('/search')
      })()

      e.preventDefault()
    },
    onReset (e) {
      e.preventDefault()
    }
  }
}
</script>
