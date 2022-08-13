<template>
    <div class="mt-5">

        <div class="row">
            <div class="col-lg-10 mx-auto mb-4">
                <div class="section-title text-center ">
                    <h3 class="top-c-sep">Register</h3>
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
                                <label for="name">Name</label>
                                <input id="name" type="string" class="form-control" v-model="form.name">
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input id="email" type="email" class="form-control" v-model="form.email">
                            </div>

                            <div class="form-group">
                                <label for="nama">Password</label>
                                <input type="password" class="form-control" v-model="form.password">
                            </div>

                            <button class="btn btn-primary" type="button" @click="register"><i class="fa fa-paper-plane"></i> Register</button>
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name:'Register',
    data(){
        return {
            form: {
                name: '',
                email: '',
                password: '',
            },
            errors: false
        }
    },
    methods:{
        register(){
            axios.post('auth/register',{
                name:this.form.name,
                email:this.form.email,
                password:this.form.password,
            })
            .then(response => {
                if(response.status == 201){
                    Swal.fire({
                        title: 'Success',
                        text: 'New member successfully added',
                        icon: 'success',
                    })
                    this.$router.push({ name: 'login' })
                }
            }).catch(err=>{
                this.errors = err.response.data.message
            })
        }
    }
}
</script>