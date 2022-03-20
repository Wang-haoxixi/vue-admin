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
            v-for="item in cateOption.cateOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
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

    <el-table :data="infoTableData.data" v-loading="loading" @selection-change="selectionChange" border style="width: 100%">
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="categoryId" label="类别" :formatter="categoryFormatter"> </el-table-column>
      <el-table-column prop="createDate" label="日期" :formatter="dateFormatter"> </el-table-column>
      <el-table-column prop="admin" label="管理人"><template>管理员</template></el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" type="success">编辑</el-button>
          <el-button size="mini" type="success">编辑详情</el-button>
          <el-button size="mini" type="danger" @click="delCurrent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="del-pagination">
      <el-button type="medium" @click="delSelected">批量删除</el-button>
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
    <!-- <DialogInfo :flag.sync="dialogInfo" @close="closeDialog" /> -->
    <DialogInfo :flag.sync="dialogInfo" :infoCate="cateOption.cateOption" @addInfoFn="getList" />
  </div>
</template>

<script>
import DialogInfo from "./Dialog/info.vue";
import { reactive, ref, onMounted} from "@vue/composition-api";
import { GetList, deleteInfo } from "@/api/news.js"
import { formatterTime } from "@/utils/common"
export default {
  name: "info",
  components: {
    DialogInfo,
  },
  setup(props, { root }) {
    onMounted(() => {
      getInfoCate();
      getList();
      
    });
    // 删除信息的id
    const deleteInfoId = ref("");
    // 表格遮罩层
    const loading = ref(false);
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
      cate: "", // 类别
      date: "", // 日期
      keyword: 1, // 关键字
      searchName: "", // 搜索名
    });
    // 类别选项
    const cateOption = reactive({
      cateOption:[],
    });
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
    const infoTableData = reactive({
      data: [],
    });

    // -------------------------------------------------------

    // 切换页数
    const handleSizeChange = (val) => {
      pageSize.value = val;
      getList();
    };
    // 切换页面
    const handleCurrentChange = (val) => {
      currentPage.value = val;
      getList();
    };
    // 添加按钮 控制弹窗显隐
    const handleAdd = () => {
      dialogInfo.value = true;
    };
    // 关闭弹窗，子组件的回调
    // const closeDialog = () => {
    //   dialogInfo.value = false;
    // };
    // 删除当前信息
    const delCurrent = ({ id }) => {
      console.log(id)
      deleteInfoId.value = [id];
      root.confirm({
        content: "确认删除此信息？",
        tip: "警告",
        type: "warning",
        fn: callDel,
      });
      
    }
    // 删除所选信息
    const delSelected = () => {
      if(!deleteInfoId.value && deleteInfoId.value.length == 0){
        return root.$message.error("请选择要删除的信息");
      };
      root.confirm({
        content: "确认删除所选信息？",
        tip: "",
        type: "warning",
        fn: callSelectedDel,
      });
    }
    // 调用删除接口
    const callDel = () => {
      deleteInfo({ id: deleteInfoId.value }).then(res => {
        if(res.data.resCode == 0){
          root.$message.success("删除成功");
          getList();
        }
      })
    };
    // 调用批量删除接口
    const callSelectedDel = () => {
      deleteInfo({ id: deleteInfoId.value }).then(res => {
        if(res.data.resCode == 0){
          root.$message.success("删除成功");
          getList();
        }
      })
    };
    // 信息列表
    const getList = () => {
      loading.value = true;
      let requestData = {
        // categoryId: 1,
        // title: "vue3",
        pageNumber: currentPage.value,
        pageSize: pageSize.value,
      }
      GetList(requestData).then(response => {
        console.log(response)
        infoTableData.data = response.data.data.data;
        total.value = response.data.data.total;
        loading.value = false;
      }).catch(error => {
        loading.value = false;
      })
    };
    const getInfoCate = () => {
      root.$store.dispatch("common/getInfoCate").then(response => {
        cateOption.cateOption = response
      })
    };
    const categoryFormatter = (data) => { // 格式化分类
      let cateName = "";
      cateOption.cateOption.forEach(item => {
        if(item.id == data.categoryId){
          cateName = item.category_name;
        }
      });
      return cateName;
    }
    const dateFormatter = (data) => { // 格式化日期
      return formatterTime(data.createDate);
    }
    // 当选择项发生变化时会触发该事件
    const selectionChange = (val) => {
      let ids = val.map(item => { // 过滤出id
        return item.id
      });
      deleteInfoId.value = ids;
    }
    return {
      loading,
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
      // closeDialog,
      delCurrent,
      delSelected,
      getList,
      categoryFormatter,
      dateFormatter,
      selectionChange,
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