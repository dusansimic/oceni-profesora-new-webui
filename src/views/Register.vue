<template>
  <div>
    <b-row>
      <b-col/>
      <b-col xl=6 lg=6 md=8 sm=8 cols=10>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id=usernameInputGroup
            label="Username:"
            label-for=usernameInput>
            <b-form-input
              id=usernameInput
              v-model="registrationData.username"
              type=text
              :state="registrationData.usernameState"
              aria-describedby="usernameInputHelp usernameInputFeedback"
              placeholder="Username"/>

            <b-form-invalid-feedback id=usernameInputFeedback>
              Korisnik sa istim username-om već postoji
            </b-form-invalid-feedback>

            <b-form-text id=usernameInputHelp>
              Unesite vaš username
            </b-form-text>
          </b-form-group>

          <b-form-group
            id=passwordInputGroup1
            label="Lozinka:"
            label-for=passwordInput1>
            <b-form-input
              id=passwordInput1
              v-model="registrationData.password1"
              type=password
              :state="registrationData.password1State"
              aria-describedby="passwordInput1Help passwordInput1Feedback"
              placeholder="Password"/>

            <b-form-invalid-feedback id=passwordInput1Feedback>
              Uneta lozinka nije validna
            </b-form-invalid-feedback>

            <b-form-text id=passwordInput1Help>
              Unesite vašu lozinku
            </b-form-text>
          </b-form-group>

          <b-form-group
            id=passwordInputGroup2
            label="Ponovna lozinka:"
            label-for=passwordInput2>
            <b-form-input
              id=passwordInput2
              v-model="registrationData.password2"
              type=password
              :state="registrationData.password2State"
              aria-describedby="passwordInput2Help passwordInput2Feedback"
              placeholder="Password"/>

            <b-form-invalid-feedback id=passwordInput2Feedback>
              Uneta lozinka se ne poklapa sa prvobitnom
            </b-form-invalid-feedback>

            <b-form-text id=passwordInput2Help>
              Ponovo unesite vašu lozinku
            </b-form-text>
          </b-form-group>

          <b-button type=submit variant=primary>Register</b-button>
        </b-form>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import sha256 from 'sha256'

export default {
  name: 'Register',
  data () {
    return {
      registrationData: {
        username: null,
        usernameState: null,
        password1: null,
        password1State: null,
        password2: null,
        password2State: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      // e.preventDefault() // eslint-disable-line func-call-spacing

      (async () => { // eslint-disable-line no-unexpected-multiline
        try {
          if (this.registrationData.password1 !== this.registrationData.password2) {
            this.registrationData.password1State = this.registrationData.password2State = false
            return
          }
          console.log('Sending')
          const response = await axios.post('https://oceni-profesora.herokuapp.com/api/user', {
            username: this.registrationData.username,
            passwordHash: sha256(this.registrationData.password1)
          })
          console.log('Sent and recived')
          console.log(response)
        } catch (e) {
          console.log('Errorrr')
          console.error(e)
        }
      })()
    },
    onReset (e) {
      e.preventDefault()
    }
  }
}
</script>
