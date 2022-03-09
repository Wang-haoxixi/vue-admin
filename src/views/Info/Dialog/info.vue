<template>
  <div>
    <el-dialog title="添加信息" :visible.sync="dialog_info_flag" @close="close">
      111111
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    // 控制弹框显隐
    const dialog_info_flag = ref(false);

    // dialog弹窗关闭后触发
    const close = () => {
      // emit("close"); // 需要做逻辑处理时用回调的方式触发父组件方法
      emit("update:flag", false); // 无逻辑处理时可以使用 .sync 修饰符的方式来处理
    };

    // 侦听父组件传进来flag的变化，若变化了，给dialog_info_flag重新赋值
    watch(() => props.flag,(newVal, oldVal) => {
      console.log("新值：", newVal, "，旧值：", oldVal);
      dialog_info_flag.value = newVal;
    });

    return {
      dialog_info_flag,
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>