<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id=ocenaInputGroup
        label="Ocena:"
        label-for=ocenaInput
        description="Ocenite profesora."
      >
        <b-form-input id=ocenaInput type=number :state="isValidOcena" v-model="ocena"></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OcenaInput',
  props: {
    profesorId: String
  },
  data () {
    return {
      ocena: '',
      isValidOcena: null
    }
  },
  watch: {
    ocena: function (ocena) {
      this.isValidOcena = ocena === '' ? null : ocena > 0 && ocena < 6
    }
  },
  methods: {
    onSubmit (e) {
      (async () => {
        const response = await axios.put(`https://oceni-profesora.herokuapp.com/api/ocena/${this.profesorId}`, {
          ocena: parseInt(this.ocena)
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': this.$session.get('token')
          }
        })

        console.log(response)

        this.$store.commit('getProfesors', {
          jmbg: this.profesorId
        })
        this.onReset()
      })()

      e.preventDefault()
    },
    onReset (e) {
      this.ocena = ''

      e.preventDefault()
    }
  }
}
</script>
