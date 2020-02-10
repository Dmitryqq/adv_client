<template>
<div class="div">
    {{advertisement}}
</div>
</template>

<script>
// import panel from '../components/Panel.vue'

export default {
    components: {
        // panel
    },
    data: function(){
        return {
            advertisement: {},
        }
    },
    computed:{
        // advertisement(){
        //     return this.$store.state.advertisements.advertisements;
        // },
    },
    created(){
        this.getAdvertisementChannel()
    },
    methods: {
        getAdvertisementChannel () {
            this.$store.dispatch('advertisements/getAdvertisementChannel', this.$route.params.id)
            .then((res)=>{
                this.advertisement = res;
            })
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        }
    },
}
</script>