<template>
  <!-- <div class="page-header">
    <div class="header-text">App name</div>
    <div class="header-image"><img src="header-image.png" class="responsive" align="center" /></div>
  </div>-->
  <div class="page-header">
    <div class="grid-container">
      <div class="grid-item">
        <p class="app-title">
          <b>App name</b>
        </p>
        <p class="app-description">Some text 123</p>
      </div>
      <div class="grid-item">
        <img src="header-image.png" class="responsive" align="center" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-header"
};
</script>

<style>
.page-header {
  margin-bottom: 0px;
  max-height: 200px;
    min-height: 110px;
  text-align: right;
}
.app-title {
  font-size: 50px;
  margin-bottom: 0px;
}
.app-description {
  font-size: 40px;
  margin-bottom: 0px;
}
.header-text {
  /* float: right; */
}
.responsive {
  width: 58vw;
  max-width: 650px;
  
    min-height: 110px;
  /* height: auto; */
}
.grid-container {
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: #2196f3;
}
.grid-item{
}
/* @media screen and (max-width: 1200px) {
  .page-header {
    font-size: 44px;
  }
}

@media screen and (max-width: 992px) {
  div {
    font-size: 15px;
  }
} */

@media screen and (max-width: 767px) {
  .app-title {
    font-size: 26px;
  }
  .app-description {
    font-size: 20px;
  }
}
</style>