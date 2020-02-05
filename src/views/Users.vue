<template>
    <panel header = "Список пользователей">
        <table border="1" class="table">
            <tr>
                <td><b>№</b></td>
                <td><b>username</b></td>
                <td><b>name</b></td>
                <td><b>phone</b></td>
                <td><b>email</b></td>
                <td><b>role.name</b></td>
                <td><b>balance</b></td>
                <td><b>status</b></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role.name }}</td>
                <td>{{ user.balance }}</td>
                <td>{{ user.status }}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><input class="form-control" type="text" name="username" v-model="user.username"></td>
                <td><input class="form-control" type="text" name="name" v-model="user.name"></td>
                <td><input class="form-control" type="text" name="phone" v-model="user.phone"></td>
                <td><input class="form-control" type="text" name="email" v-model="user.email"></td>
                <td>
                    <div class="form-group">
                    <select class="form-control form-control-sm" v-model="user.roleId">
                        <option disabled value="">Роль</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                    </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button type="submit" class="btn btn-primary">Добавить</button></td>
            </tr>
        </table>
    </panel>
</template>

<script>
import panel from '../components/Panel.vue'

export default {
    components: {
        panel
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
        users(){
            return this.$store.state.users.users;
        },
        roles(){
            return this.$store.state.roles.roles;
        },
    },
    created(){
        this.getUsers()
        this.getRoles()
    },
    methods: {
        getUsers () {
            this.$store.dispatch('users/getUsers')
            .then(()=>{
                this.isLoading = false; 
            })
            .catch(err=>{
                this.isLoading = false; 
                this.error = err.message;
            })       
        },
        getRoles () {
            this.$store.dispatch('roles/getRoles')
            .catch(err=>{
                this.error = err.message;
            })   
            .finally(()=>{
                this.isLoading = false; 
            })    
        },
        // addUser(){  
        //     // console.log(this.user.name, this.user.email, this.user.roleId)
        //     if(this.user.name.length>0 && this.user.email.length>0 && this.user.roleId!=0 ) {
        //             console.log(this.user)
        //             this.$store.dispatch('users/addUser', this.user)
        //             .then(()=>{ 
        //             this.clearForm()
        //         })
        //         .catch((err)=>{
        //             this.error=err.message
        //         })
        //         }
        // },
        clearForm(){
            this.user.name = '';
            this.user.email = '';
            this.user.roleId = null;
        },
        // deleteUser(){
        //     this.isLoading = true;
        //     this.$store.dispatch('users/deleteUser', this.us.id_users)
        //     .then((res)=>{
        //         this.isLoading = false; 
        //         this.error = null;
        //         this.success =res;
        //         setTimeout(()=>{this.success = null},3000);
        //     })
        //     .catch(err=>{
        //         this.isLoading = false; 
        //         this.error = err.message;
        //     })
        // },
        // showModal(user){
        //     this.us = user;
        //     this.editMode =false;
        //     this.delMode =true;
        // },
        // confirmDelete(res){
        //     this.delMode=false;
        //     if(res){
        //         this.deleteUser()
        //     }
        // },
        // updateUser(){
        //     this.isLoading = true;
        //     this.$store.dispatch('users/updateUser', this.us)
        //     .then((res)=>{
        //         this.isLoading = false; 
        //         this.editMode =false;
        //         this.error = null;
        //         this.success = res;
        //         setTimeout(()=>{this.success = null},3000);
        //     })
        //     .catch(err=>{
        //         this.isLoading = false; 
        //         this.error = err.message;
        //     })
        // },
    },
}
</script>

<style scoped>
/* td:nth-child(1){
    width: 1%;
}
td:nth-child(2),td:nth-child(3),td:nth-child(4){
    width:17%;
}
td:nth-child(5), td:nth-child(6){
    width: 1%;
}
td:nth-child(7){
    width: 1%;
}
select{
    text-align: center;
    text-align-last:center;
} */
</style>