<template>
  <div id="main">
    <div class="main-warp">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main {
  // position: fixed;
  // top: 75px;
  // left: $navMenuWidth;
  // right: 0;
  // bottom: 0;
  // border: 12px solid #f7f7f7;
  // height: 100vh;
  // padding-left: $navmenuWidth;
  height: 100vh;
  padding-left: $navMenuWidth;
  padding-top: $layoutHeader;
  box-sizing: border-box;
  .main-warp {
    width: 100%;
    height: 100%;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    background: #f7f7f7;

    .content {
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
    }
  }
}
</style>