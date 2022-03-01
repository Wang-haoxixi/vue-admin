<template>
  <div>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="name"></use>
    </svg>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "svgIcon",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>