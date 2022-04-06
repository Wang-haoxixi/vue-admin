<template>
  <div id="userIndex">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="关键字：">
            <selectComponent :config="data.selectOptions" />
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import selectComponent from "@/components/select"
export default {
  name: "userIndex",
  components: { selectComponent },
  setup(props, { root }) {
    const data = reactive({
      selectOptions: [ "name", "phone", "email", ],
    })

    return{
      data,
    }
  }
};
</script>

<style lang="scss" scoped>
#userIndex {
}
</style>