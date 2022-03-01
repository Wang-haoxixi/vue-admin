<template>
  <div id="header">
    <div class="pull-left header-icon">
      <svg-icon iconName="menu" />
    </div>
    <div class="pull-right right-box">
      <div class="user-info">
        <img src="../../../assets/header-image.png">
        <span>管理员</span>
      </div>
      <div class="header-icon">
        <svg-icon iconName="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../../../icons/SvgIcon.vue';
export default {
  components: { SvgIcon },};
</script>

<style lang="scss" scoped>
#header {
  position: fixed;
  top: 0;
  left: $navMenuWidth;
  right: 0;
  height: 75px;
  background: #fff;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.header-icon{
  padding: 0 30px;
  svg{
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.right-box{
  display: flex;
  .user-info{
    padding-right: 23px;
    border-right: 1px solid #ededed;
    img{
      width: 36px;
      vertical-align: middle;
      margin-right: 18px;
    }
  }

}
</style>