<template>
    <div>
        <div class="job-box d-md-flex align-items-center justify-content-between mb-30" v-for="(member,index) in members" :key="index">
                                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                    <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                        <img :src="'http://127.0.0.1:8000/avatar/'+member.avatar" width="50" height="50">
                                    </div>
                                    <div class="job-content">
                                        <h5 class="text-center text-md-left">{{ member.nama }}</h5>
                                        <ul class="d-md-flex flex-wrap ff-open-sans">
                                            <li class="mr-md-4">
                                                <i class="fa fa-map-marker mr-1"></i> {{ member.alamat }}
                                            </li>
                                            <li class="mr-md-4">
                                                <i class="fa fa-envelope mr-1"></i> {{ member.email }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="job-right my-4 flex-shrink-0" v-if="isLoggedIn">
                                    <router-link :to="{name:'update-member',params:{uuid:member.uuid}}" class="btn d-block d-sm-inline-block btn-warning mr-md-1">
                                        <i class="fa fa-pencil"></i>
                                    </router-link>
                                    <a @click="deleteMember(member.uuid)" class="btn d-block d-sm-inline-block btn-danger">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                </div>
                        </div>
                        <div class="mb-5">
                            <infinite-loading @infinite="getMembers">
                                <div slot="no-more">No more ...</div>
                                <div slot="no-results">No results ..</div>
                            </infinite-loading>
                        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {mapGetters} from 'vuex'
export default {
    name:'MemberItem',
    data(){
        return {
            members : [],
            errors:[],
            page : 1
        }
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        user: 'user',
      })
    },
    methods:{
        getMembers($state){
            try{
               axios.get(`members?offset=${this.page}`)
                    .then(response =>{
                        let data = response.data.data
                        if (data.length) {

                            this.page + 1;
                            this.members.push(...data);

                            $state.loaded();
                        } else {

                            $state.complete();
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                    })

                    this.page = this.page + 1;
            }catch (e) {
                this.errors.push(e)
            }
        },
        deleteMember(uuid){
            Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.delete(`members/delete/${uuid}`)
                        .then(response =>{
                            Swal.fire('Delete!', response.data.message, 'success')
                            this.getMembers()
                            
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                }
            })
        }
    }
}
</script>