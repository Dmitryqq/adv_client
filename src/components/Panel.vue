<template>
  <div class="panel">
    <div class="panel-header" v-if="header">{{header}}</div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "panel",
  props: {
    header: String
  }
};
</script>

<style scoped>
.panel-header {
  /* width: 100%; */
  padding: 10px;
  background: #846bab;
  color: #fff;
  font-size: var(--sc-txt-size);
}
.panel-body {
  width: 100%;
  display: inline-block;
}
.panel {
  box-shadow: 0 0px 0px #ccc;
  margin: auto;
  width: 70%;
  padding-top: 20px;
  font-size: 100%;
}
@media screen and (max-width: 1280px) {
  .panel {
    margin: 20px 5% 0;
    width: 90%;
  }
}
</style>

