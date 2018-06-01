import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home'
import Search from './views/Search'
import About from './views/About'
import Login from './views/Login'
import Register from './views/Register'
import Profesor from './views/Profesor'
import Profile from './views/Profile'
import AddProfesor from './views/AddProfesor'

Vue.use(Router)

function getProfesorData (route) {
  return {
    profesor: store.state.profesorList.filter(prof => prof.jmbg === route.params.jmbg)[0]
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profesor/:jmbg',
      name: 'profesor',
      component: Profesor,
      props: getProfesorData
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/addprofesor',
      name: 'addprofesor',
      component: AddProfesor
    }
  ]
})
