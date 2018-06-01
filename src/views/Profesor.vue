<template>
  <div>
    <br/>
    <b-row>
      <b-col/>
      <b-col xl=6 lg=8 md=9 sm=8 cols=10>
        <h1>{{ profesor.ime }} {{ profesor.prezime }}</h1>
        <b-container>
          <b-row>
            <b-col xl=4 lg=4 md=4 sm=4 cols=4><label>Ocena:</label></b-col>
            <b-col><label>{{ profesor.srednjaOcena }}</label></b-col>
          </b-row>
          <b-row>
            <b-col xl=4 lg=4 md=4 sm=4 cols=4><label>JMBG:</label></b-col>
            <b-col><label>{{ profesor.jmbg }}</label></b-col>
          </b-row>
        </b-container>
        <b-button variant=danger size=sm @click="onDeleteProfesor">Obriši profesora</b-button>
      </b-col>
      <b-col/>
    </b-row>
    <b-row>
      <b-col/>
      <b-col xl=5 lg=6 md=7 sm=6 cols=10>
        <OcenaInput :profesorId="profesor.jmbg" v-if="this.$session.get('logedIn')"/>
        <KomentarInput v-if="this.$session.get('logedIn')" :profesorData="profesor"/>
        <Komentar v-for="komentar in profesor.komentari" :key="komentar.id" :data="komentar" :profesorId="profesor.jmbg"/>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
import KomentarInput from '@/components/KomentarInput'
import Komentar from '@/components/Komentar'
import OcenaInput from '@/components/OcenaInput'
import axios from 'axios'

export default {
  name: 'Profesor',
  components: {
    KomentarInput,
    Komentar,
    OcenaInput
  },
  props: {
    profesor: Object
  },
  methods: {
    onDeleteProfesor (e) {
      (async () => {
        await axios.delete(`https://oceni-profesora.herokuapp.com/api/profesor/${this.profesor.jmbg}`)

        this.$router.push('/')
      })()

      e.preventDefault()
    }
  },
  mounted () {
    console.log(this.profesor)
  }
}
</script>
