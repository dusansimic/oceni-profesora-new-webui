<template>
  <div id="app">
    <b-row>
      <b-col/>
      <b-col xl=8 lg=8 md=10>
        <b-navbar toggleable=md type=dark variant=dark id=navbar>
          <b-navbar-toggle target=navCollapse></b-navbar-toggle>

          <b-navbar-brand to=/>Oceni profesora</b-navbar-brand>

          <b-collapse is-nav id=navCollapse>
            <b-navbar-nav>
              <b-nav-item to=/ exact>Početna</b-nav-item>
              <b-nav-item to=/search exact>Pretraživanje</b-nav-item>
              <b-nav-item to=/about exact>O aplikaciji</b-nav-item>
            </b-navbar-nav>

            <!-- Elementi na desnoj strani nav-bara -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown text=User right>
                <div v-if="this.$session.get('logedIn')">
                  <b-dropdown-item to=/profile>Profil</b-dropdown-item>
                  <b-dropdown-item @click="onLogoutClick">Odloguj se</b-dropdown-item>
                </div>
                <div v-else>
                  <b-dropdown-item to=/login>Uloguj se</b-dropdown-item>
                  <b-dropdown-item to=/register>Registruj se</b-dropdown-item>
                </div>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <router-view/>
        <footer>
          <p>MIT © Dušan Simić</p>
        </footer>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    onLogoutClick () {
      this.$session.set('logedIn', false)
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Ubuntu', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
footer {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  #navbar {
    margin-top: 10px;
    border-radius: 5px;
  }
}
</style>
