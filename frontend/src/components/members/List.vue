<template>
    <div class="mt-5">

        <div class="row">
            <div class="col-lg-10 mx-auto mb-4">
                <div class="section-title text-center ">
                    <h3 class="top-c-sep">List Member</h3>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="career-search mb-60">
                    <div class="filter-result">
                        <Item/>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoggedIn">
            <router-link :to="{name:'create-member'}"  class="btn btn-primary btn act-btn"><i class="fa fa-plus"></i></router-link>
        </div>

    </div>
</template>
<script>
import Item from './Item.vue'
import {mapGetters} from 'vuex'
export default {
    name:'MemberList',
    components: { Item },
    computed: {
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
        user: 'user',
      })
    },
}
</script>