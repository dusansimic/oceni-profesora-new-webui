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
              v-model="loginData.username"
              type=text
              :state="loginData.usernameState"
              aria-describedby="usernameInputHelp usernameInputFeedback"
              placeholder="Username"/>

            <b-form-invalid-feedback id=usernameInputFeedback>
              Uneti username nije validan
            </b-form-invalid-feedback>

            <b-form-text id=usernameInputHelp>
              Unesite vaš username
            </b-form-text>
          </b-form-group>

          <b-form-group
            id=passwordInputGroup
            label="Password:"
            label-for=passwordInput>
            <b-form-input
              id=passwordInput
              v-model="loginData.password"
              type=password
              :state="loginData.passwordState"
              aria-describedby="passwordInputHelp passwordInputFeedback"
              placeholder="Password"/>

            <b-form-invalid-feedback id=passwordInputFeedback>
              Uneti password nije validan
            </b-form-invalid-feedback>

            <b-form-text id=passwordInputHelp>
              Unesite vaš password
            </b-form-text>
          </b-form-group>

          <b-button type=submit variant=primary>Login</b-button>
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
  name: 'Login',
  data () {
    return {
      loginData: {
        username: null,
        usernameState: null,
        password: null,
        passwordState: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      // e.preventDefault() // eslint-disable-line func-call-spacing

      (async () => { // eslint-disable-line no-unexpected-multiline
        try {
          const response = await axios.post('https://oceni-profesora.herokuapp.com/api/user/auth', {
            username: this.loginData.username,
            passwordHash: sha256(this.loginData.password)
          })

          if (response.data.ok) {
            this.$session.set('logedIn', true)
            this.$session.set('token', response.data.token)
            this.$session.set('username', this.loginData.username)
            this.$router.push('/')
          }
        } catch (e) {
          console.error(e.message)
        }
      })()
    },
    onReset (e) {
      e.preventDefault()
    }
  }
}
</script>
