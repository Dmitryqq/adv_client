<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light py-2 sticky-top">
    <!-- <button class="navbar-toggler" data-toggle="collapse" data-target="#collapse_target">
      <span class="navbar-toggler-icon"></span>
    </button> -->

    <!-- <div class="collapse navbar-collapse" id="collapse_target"> -->
      <a class="navbar-brand" href="#">Главная</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/create">Создать</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li v-if="user!=null" class="nav-item">
          <a class="nav-link" style="padding-right:10px" href="#">
            <i class="fa fa-bell fa-md">
              <span class="badge badge-info">11</span>
            </i>
          </a>
        </li>
      </ul>
    <!-- </div> -->
    <ul class="navbar-nav" v-if="user!=null">
      <li class="nav-item dropdown ml-auto">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          data-target="navbarDropdown"
        >
          <!-- <span class="caret"></span> -->
          {{user.username}}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/ads">Мои объявления</a>
          <a class="dropdown-item" href="/profile">Настройки</a>
          <a class="dropdown-item" href="/adsonmychannels">Рекламы на моих каналах</a>
          <div v-if="user.role == 'Главный администратор'">
            <a class="dropdown-item" href="/channels">Каналы</a>
            <a class="dropdown-item" href="/channels/admins">Админы каналов</a>
            <a class="dropdown-item" href="/channels/agents">Агенты каналов</a>
            <a class="dropdown-item" href="/channels/tariffs">Тарифы каналов</a>
          </div>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href @click="logout">Выйти</a>
        </div>
      </li>
    </ul>
    <div v-else>
        <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <!-- <router-link to="/login" class="nav-link">Войти</router-link> -->
        <a class="nav-link" href="/login">Войти</a>
      </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data: function() {
    return {
      username: String,
      logged_in: Boolean
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.$store.dispatch("auth/decodeUser");
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/").catch(error => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
        // this.$router.push('/')
      });
    }
  }
};
</script>

<style scoped>
.navbar-nav {
    position: static;
}
.navbar-nav .dropdown-menu {
  position: static;
  float: none;
}
.dropdown-menu {
  position: absolute;
}
.dropdown-menu.show {
  position: absolute;
}
</style>


