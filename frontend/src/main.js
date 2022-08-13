import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import InfiniteLoading from 'vue-infinite-loading';
import store from './store'
import axios from 'axios'


import { setHeaderToken } from '../utils/auth'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

axios.defaults.baseURL = 'http://localhost:8080/api/'

Vue.config.productionTip = false

Vue.use(InfiniteLoading);

const token = localStorage.getItem('token');

if (token) { 
  setHeaderToken(token) 
} 

store.dispatch('get_user', token)
.then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}).catch((error) => {
  console.error(error);
})
