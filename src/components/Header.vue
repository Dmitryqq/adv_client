<template>
  <!-- <div class="page-header">
    <div class="grid-container">
      <div class="grid-item" style="text-align: right">
        <img src="../../public/header-image.png" id="responsive" align="center" />
      </div>
      <div class="grid-item">
        <p class="app-title">
          <b>ADVERT</b>
        </p>
      </div>
    </div>
  </div>-->
  <div class="page-header">
      <img src="../../public/header-image-white.png" id="responsive" align="center" />
  </div>
</template>

<script>
export default {
  name: "page-header"
};
</script>

<style>
.page-header {
  /* margin-bottom: 0px; */
  padding-top: 40px;
  text-align: center;
  height: 300px;
  background-image: url("../../public/Tv.jpg");
  background-position: center;
    background-size: 100%;
  /* z-index: -10; */
  /* min-width: 360px; */
  /* text-align: right; */
}
/* .page-header::after{
    content: "";
    background-image: url("../../public/channels4_banner.jpg");
    background-position: left;
    background-size: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    height: calc(100% + 200px);
    z-index: -1;   
    opacity: 1;
} */
#responsive{
  position: fixed;
  left: 50%;
  margin-left: -100px;
  width: 200px;
  height: auto;
  z-index: 0;
}
@media screen and (max-width: 767px) {
  .page-header{
    background-size: 150%;
  }
}
</style>