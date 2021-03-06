import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSessionStorage from 'vue-sessionstorage'
import App from './App'
import store from './store'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(VueSessionStorage)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
