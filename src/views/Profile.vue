<template>
    <panel header = "Профиль">
    <div class="profile shadow">
        <div class="form-group green-border-focus">
            <div class="container">
                <!-- <div class="row justify-content-center">
                    <div class="col-3 text-center">
                        <b>Профиль</b>
                    </div>
                </div> -->
                <div class="row justify-content-center">
                    <div class="col-3 text-right">
                        <b>Username:</b>
                    </div>
                    <div class="col-3 text-left">
                        {{user.username}}
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 text-right">
                        <b>Имя:</b>
                    </div>
                    <div class="col-3 text-left">
                        {{user.name}}
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 text-right">
                        <b>Номер телефона:</b>
                    </div>
                    <div class="col-3 text-left">
                        {{user.phone}}
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 text-right">
                        <b>Email:</b>
                    </div>
                    <div class="col-3 text-left">
                        {{user.email}}
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 text-right">
                        <b>Баланс:</b>
                    </div>
                    <div class="col-3 text-left">
                        {{user.balance}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </panel>
</template>

<script>
import panel from '../components/Panel.vue'

export default {
    components: {
        panel
    },
    computed:{
        user(){
            return this.$store.state.users.user;
        },
    },
    created(){
        this.getAccountDetails()
    },
    methods:{
         getAccountDetails(){
            this.$store.dispatch('users/getAccountDetails')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })  
        }
    }
}
</script>

<style scoped>
.profile{
    width: 99.8%;
    margin: auto;
    padding: 20px;
    background: #f0f0f0d3;
    outline: 3px solid gray;
    outline-style: auto;
}
</style>