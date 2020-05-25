<template>
    <div class="register-page">
        <!-- <div class="card-header">
            <h3 class="mb-0">Register</h3>
        </div> -->
        <div class="form">
            <form form class="register-form" @submit.prevent="register">
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
                <button type="submit" class="btn btn-primary btn-lg float-right" @click="register()">Create</button>
            </form>
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
.register-page {
  width: 360px;
  padding: 80px 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
</style>