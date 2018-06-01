<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id=komentarTextInputGroup
        label="Komentar:"
        label-for=komentarTextInput
        description="Unesite komentar o profesoru.">
        <b-form-textarea
          id=komentarTextInput
          v-model=komentarData.text
          placeholder="Komentar"
          :rows=3
          :max-rows=3
        />
      </b-form-group>
      <b-button type=submit variant=primary>Komentariši</b-button>
      <b-button type=reset variant=danger>Poništi</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'KomentarInput',
  props: {
    profesorData: Object
  },
  data () {
    return {
      komentarData: {
        text: ''
      }
    }
  },
  methods: {
    onSubmit (e) {
      (async () => {
        try {
          const response = await axios.put(`https://oceni-profesora.herokuapp.com/api/komentar/${this.profesorData.jmbg}`, {
            user: this.$session.get('username'),
            text: this.komentarData.text,
            vreme: new Date(),
            likes: 0,
            liked: [],
            dislikes: 0,
            disliked: []
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Token': this.$session.get('token')
            }
          })

          if (response.data.status > 399) {
            return
          }

          this.$store.commit('getProfesors', {
            jmbg: this.profesorData.jmbg
          })

          this.komentarData.text = ''
        } catch (e) {
          console.error(e.message)
        }
      })()

      e.preventDefault()
    },
    onReset () {
      this.komentarData.text = ''
    },
    getKomentari () {
      (async () => {
        const response = await axios.get(`https://oceni-profesora.herokuapp.com/api/komentar/${this.profesorData.jmbg}/${this.$session.get('username')}`)

        if (response.data.status > 399) {
          return
        }

        console.log(response)
        // get latest comments
      })()
    }
  }
}
</script>
