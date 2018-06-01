<template>
  <div>
    <br/>
    <b-card>
      <h6 slot=header class="mb-0">
        <strong>{{ data.user }}</strong>
        <br/>
        <em>{{ getTime() }}</em>
      </h6>
      <p class="card-text">
        {{ data.text }}
      </p>
      <b-row v-if="this.$session.get('logedIn')">
        <b-col/>
        <b-col align-self=end>
          <b-button-group>
            <b-button size=sm @click="onReaction('like')" :disabled="isReacted(data.liked)"><strong>Lajkuj</strong> {{ `(${data.likes})` }}</b-button>
            <b-button size=sm @click="onReaction('dislike')" :disabled="isReacted(data.disliked)"><strong>Dislajkuj</strong> {{ `(${data.dislikes})` }}</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Komentar',
  props: {
    data: Object,
    profesorId: String
  },
  methods: {
    getTime () {
      moment.locale('sr')
      return moment(this.data.vreme).fromNow()
    },
    onReaction (action) {
      (async () => {
        await axios.put(`https://oceni-profesora.herokuapp.com/api/komentar/${action}/${this.profesorId}/${this.data._id}`, {
          username: this.$session.get('username')
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': this.$session.get('token')
          }
        })

        this.$store.commit('getProfesors', {
          jmbg: this.profesorId
        })
      })()
    },
    isReacted (arr) {
      return arr.filter(name => name === this.$session.get('username')).length === 1
    }
  }
}
</script>
