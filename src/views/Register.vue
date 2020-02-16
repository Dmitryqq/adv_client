<template>
 <div class="container">
    <div class="row">
        <div class="col-md-12 mx-auto">
            <div class="row">
                <div class="col-lg-7 col-md-8 mx-auto">
                    <div class="card rounded shadow shadow-sm">
                        <div class="card-header">
                            <h3 class="mb-0">Register</h3>
                        </div>
                        <div class="card-body">
                            <form form class="register" @submit.prevent="register">
                                <div class="form-group row">
                                    <label for="username" class="col-sm-3 col-form-label text-right">Username</label>
                                    <div class="col-sm-9">
                                        <input id="username" type="text" class="form-control" v-model="user.username" required="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="name" class="col-sm-3 col-form-label text-right">Name</label>
                                    <div class="col-sm-9">
                                        <input id="name" type="text" class="form-control" v-model="user.name" required="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="phone" class="col-sm-3 col-form-label text-right">Phone</label>
                                    <div class="col-sm-9">
                                        <input id="phone" type="text" class="form-control" v-model="user.phone" required="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="email" class="col-sm-3 col-form-label text-right">Email</label>
                                    <div class="col-sm-9">
                                        <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" class="form-control" v-model="user.email" required="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="new-password-text-field" class="col-sm-3 col-form-label text-right">Password</label>
                                    <div class="col-sm-9">
                                        <input id="new-password-text-field" type="password" class="form-control" v-model="user.password" required="" autocomplete="new-password">
                                    </div>
                                </div>
                                <!-- <div class="form-group row">
                                    <label for="confirm-password-text-field" class="col-sm-3 col-form-label text-right">Repeat password</label>
                                    <div class="col-sm-9">
                                        <input id="confirm-password-text-field" type="password" class="form-control" v-model="user.password" required="" autocomplete="new-password">
                                    </div>
                                </div> -->
                                <!-- <input id="new-password-text-field" type="password" autocomplete="new-password"/>
<input id="confirm-password-text-field" type="password" autocomplete="new-password"/> -->
                                <!-- <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control form-control-lg rounded-0" v-model="user.password" required="" autocomplete="new-password">
                                </div> -->
                                <button type="submit" class="btn btn-primary btn-lg float-right" @click="register()">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'register',
    data() {
        return {
            user: {
                username: '',
                name: '',
                phone: '',
                email: '',
                password: ''
            },
        };
    },
    methods: {
        register(){
            if(this.checkFields()){
                this.user.username = this.user.username.trim();
                if (this.user.username.indexOf(' ') > -1)
                {
                    this.error = "Пробелы в логине недопустимы";
                    this.user.username = '';
                    this.user.password = '';
                }
                else{
                    this.user.username = this.user.username.toLowerCase();
                    this.$store.dispatch('auth/registerUser',this.user)
                    .then(()=>{
                        // this.$router.replace({path: '/login'})
                        // this.$router.push('/login').catch(err => {})
                        this.$router.push('/login').catch(error => {
                            if (error.name != "NavigationDuplicated") {
                                throw error;
                            }
                        });
                    })
                    .catch(err=>{
                        console.log(err)
                        this.error = err.message;
                        this.user.username = '';
                        this.user.password = '';
                    })
                }
            }
            else{
                this.error = "Заполните все поля";
            }
        },
        checkFields(){
            if(this.user.username != '' && 
                this.user.name != '' && 
                this.user.phone != '' && 
                this.user.email != '' && 
                this.user.password != '')
                return true;
            else
                return false;
        }
    }
}
</script>

<style scoped>
.row{
    margin-top: 20px;
}
.col-sm-3 col-form-label{
    justify-content: flex-end;
}
/* .label {
    text-align: right;
    clear: both;
    float:left;
    margin-right:15px;
} */
</style>