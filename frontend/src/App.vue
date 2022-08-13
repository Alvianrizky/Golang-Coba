<template>
  <div id="app">
    <Navbar/>
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/layouts/Navbar.vue'
export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>