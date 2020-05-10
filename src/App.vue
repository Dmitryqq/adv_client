<template>
  <div id="app">
    <Header />
    <navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { USER_REQUEST } from "./store/actions/user";

export default {
  name: "app",
  components: {
    Navbar,
    Header,
    Footer
  },
  created: function() {
    // if (this.$store.getters.isAuthenticated) {
    // }
  }
};
</script>

<style lang="scss">
@import './assets/style.scss';
</style>
