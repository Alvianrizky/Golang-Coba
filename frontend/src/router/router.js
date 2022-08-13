import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'
import Home from '../components/Home.vue'

import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'

Vue.use(Router);

const routes = [
    {
      path: '/',
      name: 'login',
      title: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      title: 'Register',
      component: Register,
    },
    {
      path: '/home',
      name: 'home', 
      component:Home,
        meta: {
          auth: true
        }
    }
];

const router  = new Router({
    mode:'history',
    routes,
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      return
    }
    next('/')
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/home')
  }

  next()
})

export default router

