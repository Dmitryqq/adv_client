<template>
  <div class="notification-block" id="notificationsDropdown">
    <!-- <div>{{notifications}}</div> -->
    <NotificationElement v-for="notification in notifications" :key="notification.id" :id="notification.id">
        {{notification.notification_text}}
    </NotificationElement>
  </div>
</template>
<script>
import NotificationElement from "./NotificationElement"

export default {
  name: "notification-block",
  components: {
      NotificationElement
  },
  computed: {
    notifications() {
      return this.$store.state.notifications.notifications;
    }
  },
//   methods: {
//     getNotifications() {
//       this.$store.dispatch("notifications/getNotifications");
//     }
//   }
};
</script>

<style>
.notification-block {
  width: 360px;
  min-height: 100px;
  max-height: 300px;
  display: none;
  margin-left: -315px;
  position: fixed;
  background-color: white;
  border: 2px solid gray;
  border-radius: 00px 0px 10px 10px;
  border-top: none;
  color: black;
  overflow: auto;
  transition: max-height 0.25s ease-in;
  z-index: 10;
}

@media screen and (max-width: 767px) {
  .notification-block {
    width: 230px;
    right: 0;
    left: auto;
  }
}

@media screen and (max-width: 992px) {
  .notification-block {
    margin-left: -309px;
  }
}
</style>


