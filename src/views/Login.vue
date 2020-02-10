<template>
 <!-- <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="user.username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="user.password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div> -->
 <div class="container">
    <div class="row">
        <div class="col-md-12 mx-auto">
            <div class="row">
                <div class="col-lg-5 col-md-8 mx-auto">
                    <div class="card rounded shadow shadow-sm">
                        <div class="card-header">
                            <h3 class="mb-0">Login</h3>
                        </div>
                        <div class="card-body">
                            <form form class="login" @submit.prevent="login">
                                <div class="form-group">
                                    <label for="uname1">Username</label>
                                    <input type="text" class="form-control form-control-lg rounded-0" v-model="user.username" required="">
                                    <div class="invalid-feedback">Oops, you missed this one.</div>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control form-control-lg rounded-0" v-model="user.password" required="" autocomplete="new-password">
                                    <div class="invalid-feedback">Enter your password too!</div>
                                </div>
                                <button type="submit" class="btn btn-success btn-lg float-right">Login</button>
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
    name: 'login',
    data() {
        return {
            user: {
                username: 'admin',
                password: 'admin'
            },
        };
    },
    methods: {
        login(){
            this.user.username = this.user.username.trim();
            if (this.user.username.indexOf(' ') > -1)
            {
                this.error = "Пробелы в логине недопустимы";
                this.user.username = '';
                this.user.password = '';
            }
            else{
                this.user.username = this.user.username.toLowerCase();
                this.$store.dispatch('auth/authUser',this.user)
                .then(()=>{
                    this.$router.replace({path: this.$route.query.redirect || '/'})
                    // this.$router.push('/')
                })
                .catch(err=>{
                    console.log(err)
                    this.error = err.message;
                    this.user.username = '';
                    this.user.password = '';
                })
            }
        }
    }
}
</script>

<style scoped>
.row{
    margin-top: 20px;
}
</style>