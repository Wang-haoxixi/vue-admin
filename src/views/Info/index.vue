<template>
  <div class="info-warp">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="类别：" class="form-item-cate">
        <el-select
          v-model="formData.cate"
          placeholder="请选择"
          class="select-cate"
        >
          <el-option
            v-for="item in cateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="date-picker"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字：">
        <el-select
          v-model="formData.keyword"
          placeholder="请选择"
          class="select-keyword"
        >
          <el-option
            v-for="item in keywordOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.searchName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="search-btn">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="search-btn" @click="handleAdd"
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="infoTableData" border style="width: 100%">
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="cate" label="类别"> </el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="admin" label="管理人"> </el-table-column>
      <el-table-column label="操作" width="250px">
        <template>
          <el-button size="mini" type="success">编辑</el-button>
          <el-button size="mini" type="success">编辑详情</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="del-pagination">
      <el-button type="medium">批量删除</el-button>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <DialogInfo :flag.sync="dialogInfo" @close="closeDialog" />
  </div>
</template>

<script>
import DialogInfo from "./Dialog/info.vue";
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "info",
  components: {
    DialogInfo,
  },
  setup(props, { root }) {
    // 当前页
    const currentPage = ref(1);
    // 总数
    const total = ref(0);
    // 每页显示条数
    const pageSize = ref(10);
    // 添加信息dialog
    const dialogInfo = ref(false);
    // 顶部搜索表单数据
    const formData = reactive({
      cate: 1, // 类别
      date: "", // 日期
      keyword: 1, // 关键字
      searchName: "", // 搜索名
    });
    // 类别选项
    const cateOption = reactive([
      {
        value: 1,
        label: "国际信息",
      },
      {
        value: 2,
        label: "国内信息",
      },
      {
        value: 3,
        label: "社会信息",
      },
    ]);
    // 关键字选项
    const keywordOption = reactive([
      {
        value: 1,
        label: "ID",
      },
      {
        value: 2,
        label: "标题",
      },
    ]);
    // 表格数据
    const infoTableData = reactive([
      {
        title: "师者为师亦为范 习近平这样关心“筑梦人”",
        cate: "国内信息",
        date: "2019-09-10 19:31:31",
        admin: "管理员",
      },
      {
        title: "师者为师亦为范 习近平这样关心“筑梦人”",
        cate: "国内信息",
        date: "2019-09-10 19:31:31",
        admin: "管理员",
      },
      {
        title: "师者为师亦为范 习近平这样关心“筑梦人”",
        cate: "国内信息",
        date: "2019-09-10 19:31:31",
        admin: "管理员",
      },
      {
        title: "师者为师亦为范 习近平这样关心“筑梦人”",
        cate: "国内信息",
        date: "2019-09-10 19:31:31",
        admin: "管理员",
      },
      {
        title: "师者为师亦为范 习近平这样关心“筑梦人”",
        cate: "国内信息",
        date: "2019-09-10 19:31:31",
        admin: "管理员",
      },
    ]);

    // 切换页数
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
    };
    // 切换页面
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
    };
    // 添加按钮 控制弹窗显隐
    const handleAdd = () => {
      dialogInfo.value = true;
    };
    // 关闭弹窗，子组件的回调
    const closeDialog = () => {
      dialogInfo.value = false;
    };
    return {
      currentPage,
      total,
      pageSize,
      formData,
      cateOption,
      keywordOption,
      infoTableData,
      dialogInfo,
      handleSizeChange,
      handleCurrentChange,
      handleAdd,
      closeDialog,
    };
  },
};
</script>

<style lang="scss">
.info-warp {
  .del-pagination {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-item-cate {
    .el-form-item__content {
      width: 110px;
    }
  }
}
</style>