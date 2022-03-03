<template>
  <div id="main" :class="[navMenuStatus ? 'close' : 'open']">
    <div class="main-warp">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutMain",
  setup(props, { root }) {
    const navMenuStatus = computed(() => {
      return root.$store.state.isCollapse;
    });
    return {
      navMenuStatus,
    };
  },
};
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
  box-sizing: border-box;
  transition: all .5s;
  &.open {
    padding-left: $navMenuWidth;
    padding-top: $layoutHeader;
  }
  &.close {
    padding-left: 64px;
    padding-top: $layoutHeader;
  }
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