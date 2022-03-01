<template>
  <div id="main"><router-view /></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#main {
  position: fixed;
  top: 75px;
  left: $navMenuWidth;
  right: 0;
  bottom: 0;
  border: 12px solid #f7f7f7;
}
</style>