<template>
    <div class="mt-5">

        <div class="row">
            <div class="col-lg-10 mx-auto mb-4">
                <div class="section-title text-center ">
                    <h3 class="top-c-sep">Login</h3>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-8 col-10 mx-auto">
                <div class="card mb-60 bg-white">
                    <div class="p-4">
                        <div class="alert alert-danger" v-if="errors">
                            {{ errors }}
                        </div>
                        <form method="POST">

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input id="email" type="email" class="form-control" v-model="form.email">
                            </div>

                            <div class="form-group">
                                <label for="nama">Password</label>
                                <input type="password" class="form-control" v-model="form.password">
                            </div>

                            <button class="btn btn-primary" type="button" @click="login"><i class="fa fa-sign-in"></i> Login</button>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Swal from 'sweetalert2'
export default {
    name:'Login',
    data(){
        return {
            form: {
                email: '',
                password: '',
            },
            errors: false
        }
    },
    methods:{
        login(){
            this.$store.dispatch('login', this.form)
                .then(response => {
                    if(response.status == 200){
                    window.location = '/home'
                }
                }).catch(error => {
                    this.errors = error.response.data.message
                })
        }
    }
}
</script>