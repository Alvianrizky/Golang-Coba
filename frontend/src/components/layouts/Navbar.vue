<template>
  <nav class="navbar navbar-expand-lg navbar-primary bg-primary">
    <router-link class="navbar-brand text-white" :to="{name:'login'}">My App</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <a class="nav-link" @click="logout" style="cursor:pointer;">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item ">
            <router-link class="nav-link text-white" :to="{name:'register'}">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" :to="{name:'login'}">Login</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
  import {mapGetters} from 'vuex'
  
  export default {
    computed: {
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        user: 'user',
      })
    },
    methods: {
      logout() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/");
            });
        }
    }
  }
</script>