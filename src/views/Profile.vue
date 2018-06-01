<template>
  <div>
    <br/>
    <b-row>
      <b-col/>
      <b-col xl=6 lg=8 md=9 sm=8 cols=10>
        <h1>{{ this.$session.get('username') }}</h1>
        <p id=tokenParagraph>{{ this.$session.get('token') }}</p>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style>
#tokenParagraph {
  word-wrap: break-word;
}
</style>
