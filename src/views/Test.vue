<template>
<div class="div">
    {{statuses}}
    <br>
    <br>
    {{tariffs}}
    <br>
    <br>
    {{advertisements}}
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
            user:{
                name: '',
                email: '',
                roleId: ''
            },
            editMode: false,
            selectedUser: {}
        }
    },
    computed:{
        statuses(){
            return this.$store.state.statuses.statuses;
        },
        tariffs(){
            return this.$store.state.tariffs.tariffs;
        },
        advertisements(){
            return this.$store.state.advertisements.advertisements;
        },
    },
    created(){
        this.getStatuses()
        this.getTariffs()
        this.getAdvertisements()
    },
    methods: {
        getStatuses () {
            this.$store.dispatch('statuses/getStatuses')
            .then(()=>{
                this.isLoading = false; 
            })
            .catch(err=>{
                this.isLoading = false; 
                this.error = err.message;
            })       
        },
        getTariffs () {
            this.$store.dispatch('tariffs/getTariffs')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        getAdvertisements () {
            this.$store.dispatch('advertisements/getAdvertisements')
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