<template>
  <div id="navMenu">
    <el-menu
      default-active="1-4-1"
      background-color="transparent"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <template v-for="(item, index) in navData">
        <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <svg-icon :iconName="item.meta.icon" class="svgicon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root, content }) {
    console.log(root.$router.options.routes)
    /**
     * data
    */
    // 控制菜单导航收缩
    const isCollapse = ref(false);
    // 菜单导航路由数据
    const navData = ref(root.$router.options.routes);

    /**
     * methods
    */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    return {
      isCollapse,
      handleOpen,
      handleClose,
      navData
    };
  },
};
</script>

<style lang="scss" scoped>
#navMenu {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: $navMenuWidth;
  background: #344a5f;
  .svgicon{
    margin-right: 5px;
    font-size: 16px;
  }
}
</style>