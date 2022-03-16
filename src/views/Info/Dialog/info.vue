<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="576px">
      <el-form ref="form" :model="form" label-width="60px" >
        <el-form-item label="类别：">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="概况：">
          <el-input type="textarea" v-model="form.case"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_info_flag = false">取 消</el-button>
        <el-button type="danger" @click="dialog_info_flag = false">确 定</el-button>
      </span>
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
    const form = reactive({
      type: "",
      title: "",
      case: "",
    })

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
      form,
      dialog_info_flag,
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>