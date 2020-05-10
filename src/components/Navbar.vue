<template>
  <div class="navbar">
    <ul class="navbar-ul">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li>
        <router-link to="/create">Создать</router-link>
      </li>
      <li>
        <router-link to="/about">О нас</router-link>
      </li>
      <!-- <li v-if="user!=null">
        <a href="#">
          <i class="fa fa-bell fa-md">
            <span class="badge badge-info">11</span>
          </i>
        </a>
      </li>-->
      <!-- <li class="dropdown" v-if="user!=null">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Messages<span>8</span></a>
        <div class="dropdown-content">
          <router-link to="/ads" class="dropdown-item">Мои объявления</router-link>
          <router-link to="/profile" class="dropdown-item">Настройки</router-link>
          <router-link to="/adsonmychannels" class="dropdown-item">Рекламы на моих каналах</router-link>
        </div>
      </li>-->
      <li>
        <a style="cursor: default">{{user.balance}} сом</a>
      </li>
      <li class="dropdown" v-if="user!=null">
        <button class="dropbtn" onclick="showNotifications()">
          <i class="fa fa-bell fa-md">
            <span class="badge badge-info" style="font-size: 15px; vertical-align: text-top:">{{notifications.length}}</span>
          </i>
        </button>
        <notification />
      </li>

      <li class="dropdown" v-if="user!=null">
        <button class="dropbtn" onclick="showMenu()">
          {{user.username}}
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" id="menuDropdown">
          <router-link to="/ads" class="dropdown-item">Мои объявления</router-link>
          <router-link to="/" class="dropdown-item">Пополнить счёт</router-link>
          <router-link to="/profile" class="dropdown-item">Настройки</router-link>
          <router-link to="/adsonmychannels" class="dropdown-item">Рекламы на моих каналах</router-link>
          <div v-if="user.role == 'Главный администратор'">
            <router-link to="/channels" class="dropdown-item">Каналы</router-link>
            <router-link to="/channels/admins" class="dropdown-item">Админы каналов</router-link>
            <router-link to="/channels/agents" class="dropdown-item">Агенты каналов</router-link>
            <router-link to="/channels/tariffs" class="dropdown-item">Тарифы каналов</router-link>
          </div>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href @click="logout">Выйти</a>
        </div>
      </li>
      <li v-else>
        <router-link to="/login">Войти</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import notification from "./Notification"
export default {
  name: "navbar",
  components: {
    notification
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    notifications(){
      return this.$store.state.notifications.notifications;
    }
  },
  created() {
    this.$store.dispatch("notifications/getNotifications");
    this.$store.dispatch("auth/decodeUser");
    this.$store.dispatch("auth/getBalance");
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

<style>
.navbar {
  width: 100%;
  /* font-size: 18px; */
  position: fixed;
  top: 300;
  z-index: 10;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding: 0 15%;
  opacity: 0.8;
  background-color: gray;
  text-align: right;
}
li {
  float: left;
}
.dropdown .dropbtn {
  cursor: pointer;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
li a,
.dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 10px 12px;
  text-decoration: none;
}
li a:hover,
.dropdown:hover .dropbtn {
  color: black;
  background-color: white;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-content a:hover {
  color: white;
  background-color: gray;
}
li:nth-child(4),
li:nth-child(5),
li:nth-child(6) {
  float: none;
  display: inline-block;
}

.show {
  display: block;
}

@media screen and (max-width: 767px) {
  li a,
  li button {
    padding: 10px 8px;
  }
}

@media screen and (max-width: 1280px) {
  ul {
    padding: 0 0;
  }
  .dropdown-content {
    right: 0;
    left: auto;
  }
}
</style>


