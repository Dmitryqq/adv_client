<template>
  <div class="element">
    <button id="x" @click="remove">X</button>
    <div class="element-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "notification-element",
  props: {
    id: Number
  },
  methods: {
    remove() {
      this.$store.dispatch("notifications/removeNotification", this.id);
    }
  }
};
</script>
<style scoped>
.element {
  text-align: left;
  width: 84%;
  height: 40px;
  /*border-radius: 25px;*/
  border: 2px solid gray;
  padding: 5px 8% 10px 1%;
  margin: 10px 3% 10px 3%;
  border-radius: 10px;
  background: white;
  overflow: visible;
  /* box-shadow: 5px 5px 2px #888888; */
  position: relative;
}

#x {
  height: 25px;
  width: 25px;
  position: absolute;
  background: gray;
  border: 2px solid white;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 3px gray;
  color: white;
  top: -5px;
  right: -10px;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  #x {
    padding: 0 0;
    right: -5px;
  }
}
</style>