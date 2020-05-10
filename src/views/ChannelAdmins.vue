<template>
  <panel header="Админы каналов">
    <table border="1" width="100%">
      <tr>
        <td>
          <b>№</b>
        </td>
        <td>
          <b>Канал</b>
        </td>
        <td>
          <b>Администратор</b>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr v-for="channelAdmin in channelAdmins" :key="channelAdmin.id">
        <td>{{ channelAdmin.id }}</td>
        <td>{{ channelAdmin.channel.name }}</td>
        <td>{{ channelAdmin.user.username }}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>
          <select v-model="channelAdmin.channelId">
            <option disabled value>Канал</option>
            <option
              v-for="channel in channels"
              :key="channel.id"
              :value="channel.id"
            >{{ channel.name }}</option>
          </select>
        </td>
        <td>
          <select v-model="channelAdmin.userId">
            <option disabled value>Пользователь</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
          </select>
        </td>
        <td></td>
        <td>
          <button @click="addChannelAdmin()">Добавить</button>
        </td>
      </tr>
    </table>
  </panel>
</template>

<script>
import panel from "../components/Panel.vue";

export default {
  components: {
    panel
  },
  data: function() {
    return {
      channelAdmin: {
        channelId: "",
        userId: ""
      },
      channelAdmins: []
    };
  },
  computed: {
    channels() {
      return this.$store.state.channels.channels;
    },
    users() {
      return this.$store.state.users.users;
    }
  },
  created() {
    this.getChannels();
    this.getUsers();
    this.getChannelsAdmins();
  },
  methods: {
    getChannels() {
      this.$store
        .dispatch("channels/getChannels")
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getChannelsAdmins() {
      this.$store
        .dispatch("channels/getChannelsAdmins")
        .then(res => {
          this.channelAdmins = res;
        })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getUsers() {
      this.$store
        .dispatch("users/getUsers")
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    addChannelAdmin() {
      try {
        this.$store
          .dispatch("channels/addChannelAdmin", this.channelAdmin)
          .then(console.log("nice"))
          .catch(err => {
            console.log(err);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style>
table {
  word-break: break-all;
  text-align-last: left;
  height: 100%;
}
td:nth-child(1) {
  width: 3%;
}
td:nth-child(2) {
  width: 20%;
}
td:nth-child(3) {
  width: 20%;
}
td:nth-child(4) {
  width: 5%;
}
td:nth-child(5) {
  width: 5%;
}
</style>