import axios from 'axios'
import { setHeaderToken,removeHeaderToken } from '../../utils/auth'
export default{
    state: { 
        user: null,
        isLoggedIn: false, 
    },
    mutations: { 
        set_user (state, data) {
            state.user = data
            state.isLoggedIn = true
        }, 
        reset_user (state) {
            state.user = null
            state.isLoggedIn = false
        }
    },
    getters:{ 
        isLoggedIn (state){
            return state.isLoggedIn
        },
        user (state) {
            return state.user
        }
    },
    actions: {
        login({ dispatch, commit }, data) {
            return new Promise((resolve, reject) => { 
              axios.post('auth/login', data)
               .then(response => {
                 let token = response.data.data.token  
                 localStorage.setItem('token', token) 
                 setHeaderToken(token) 
                 dispatch('get_user')
                 resolve(response)
               })
               .catch(err => {
                 commit('reset_user')  
                 localStorage.removeItem('token')
                 reject(err)
              })
            })
          },
          async get_user({commit}){ 
            if(!localStorage.getItem('token')){
              return
            }
            try{ 
              let response = await axios.get('user/profile',{
                headers:{
                  "Authorization" : localStorage.getItem("token")
                }
              })
                commit('set_user', response.data.data)
            } catch (error){
                commit('reset_user') 
                removeHeaderToken()
                localStorage.removeItem('token')
                return error
            } 
          },
          logout({ commit }) {
            return new Promise((resolve) => {
             commit('reset_user')
             localStorage.removeItem('token')
             removeHeaderToken()
             resolve()
            })
           }
    } 
}