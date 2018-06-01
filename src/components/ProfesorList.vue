<template>
  <b-card-group deck>
    <b-card
      v-for="profesor in profesors"
      v-bind:key="profesor.jmbg"
      :title="`${profesor.ime} ${profesor.prezime}`">
      <p class="card-text">
        JMBG: {{ profesor.jmbg }}
        <b-button :to="`/profesor/${profesor.jmbg}`">Vidi više</b-button>
      </p>
    </b-card>
    <b-card>
      <p class="card-text">
        <b-button :to="`/addprofesor`">Dodaj novog profesora</b-button>
      </p>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: 'ProfesorList',
  props: {
    profesors: Array
  }
}
</script>
