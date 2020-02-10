<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-2">
        <a class="navbar-brand" href="#">Navbar</a>
        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> -->

        <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" href="#">
            <i class="fa fa-bell fa-lg">
                <span class="badge badge-info">11</span>
            </i>
            </a>
        </li>
            <div v-if="user!=null">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Welcome, {{user.username}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another</a>
                    <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="" @click="logout">Выйти</a>
                    </div>
                </li>
            </div>
            <div v-else>
                <li>
                    <router-link to="/login" class="nav-link">Войти</router-link>
                </li>
            </div>
        </ul>
    <!-- </div> -->
</nav>
</template>

<script>


export default {
    name: 'navbar',
    data: function(){
        return {
            username: String,
            logged_in: Boolean
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },
    mounted(){
        this.$store.dispatch('auth/decodeUser');
    },
    methods:{
        logout(){
            this.$store.dispatch('auth/logout')
            .then(()=>{
                this.$router.replace({path: this.$route.query.redirect || '/'})
                // this.$router.push('/')
            })
        }
    }
}
</script>

<style scoped>

</style>


