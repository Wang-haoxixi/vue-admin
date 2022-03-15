<template>
  <div class="infoCate-warp">
    <el-button type="danger" @click="handleAddFirst({ type: 'cate_first_add' })" class="button-first">添加一级分类</el-button>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="cate-item">
          <h4 class="clearfloat">
            <svg-icon iconName="plus"></svg-icon>
            <span>国内</span> 
            <div class="btns pull-right">
              <el-button round type="danger" size="mini" @click="handleEditFirst({ type: 'cate_first_edit' })">编辑</el-button>
              <el-button round type="success" size="mini" @click="handleAddChildren({ type: 'cate_children_add' })">添加子级</el-button>
              <el-button round size="mini" @click="handleDeleteFirst">删除</el-button>
            </div>
          </h4>
          <ul>
            <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini" @click="handleEditChildren({ type: 'cate_children_edit' })">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
             <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
             <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
             <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="cate-item">
          <h4 class="clearfloat">
            <svg-icon iconName="minus"></svg-icon>
            <span>国内</span> 
            <div class="btns pull-right">
              <el-button round type="danger" size="mini">编辑</el-button>
              <el-button round type="success" size="mini">添加子级</el-button>
              <el-button round size="mini">删除</el-button>
            </div>
          </h4>
          <ul>
            <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
             <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
             <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
             <li>
              <span>国际</span>
              <div class="btns pull-right">
                <el-button round type="danger" size="mini">编辑</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="menu-title">一级分类编辑</div>
        <el-form ref="form" :model="form" label-width="120px" class="cate-form">
          <el-form-item label="一级分类名称：">
            <el-input v-model="form.firstName" :disabled="disabled_first"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：">
            <el-input v-model="form.secondName" :disabled="disabled_second"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" :disabled="disabled_botton" :loading="loading" @click="handleConfrim">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
import { AddParent } from '@/api/news.js'
import SvgIcon from '../../icons/SvgIcon.vue';
export default {
  components: { SvgIcon },
  name: "infoCate",
  setup(){
    const submit_button_type = ref("");
    const disabled_first = ref(true);
    const disabled_second = ref(true);
    const disabled_botton = ref(true);
    // 确定按钮加载
    const loading = ref(false);

    const form = reactive({
      firstName: "",
      secondName: "",
    });
    
    // -------------------------------------------------

    // 添加一级分类按钮
    const handleAddFirst = (data) => {
      submit_button_type.value = data.type;
      disabled_first.value = false;
      disabled_second.value = true;
      disabled_botton.value = false;
    };
    // 添加子级
    const handleAddChildren = (data) => {
      submit_button_type.value = data.type;
      disabled_first.value = true;
      disabled_second.value = false;
      disabled_botton.value = false;
    };
    // 编辑一级分类
    const handleEditFirst = (data) => {
      submit_button_type.value = data.type;
      disabled_first.value = false;
      disabled_second.value = true;
      disabled_botton.value = false;
    };
    // 编辑子级
    const handleEditChildren = (data) => {
      submit_button_type.value = data.type;
      disabled_first.value = true;
      disabled_second.value = false;
      disabled_botton.value = false;

    };
    // 删除一级分类
    const handleDeleteFirst = () => {
      console.log('删除一级分类...');
    }
    const handleConfrim = () => {
      if(submit_button_type.value == "cate_first_add"){ console.log("cate_first_add..."); };
      if(submit_button_type.value == "cate_children_add"){ console.log("cate_children_add..."); };
      if(submit_button_type.value == "cate_first_edit"){ console.log("cate_first_edit..."); };
      // AddParent({ categoryName: form.firstName }).then(res=>{
      //   console.log(res)
      // })
    }
    return{
      // value
      submit_button_type,
      disabled_first,
      disabled_second,
      disabled_botton,
      loading,
      form,
      // methods
      handleAddFirst,
      handleAddChildren,
      handleEditFirst,
      handleEditChildren,
      handleDeleteFirst,
      handleConfrim,
    }
  }
};
</script>

<style lang="scss" scoped>
.infoCate-warp {
  .button-first{
    margin-bottom: 20px;
  }
  .cate-item:first-of-type{
    &::before{
      top: 22px;
    }
  }
  .cate-item:last-of-type{
    &::before{
      bottom: 22px;
    }
  }
  .cate-item{
    position: relative;
    &::before{
      content: "";
      position: absolute;
      left: 28px;
      top: 0px;
      bottom: 0;
      width: 30px;
      border-left: 1px dashed #344a5f;
      z-index: 2;
    }
    h4{
      padding-left: 20px;
      line-height: 40px;
      position: relative;


      svg{
        font-size: 16px;
        position: absolute;
        top: 12px;
      }
      span{
        margin-left: 28px;
      }
    }
    .btns{
      transition: all .5s ease;
      display: none;
      padding-right: 20px;
      font-size: 12px;
    }
    li{
      margin-left: 28px;
      padding-left: 42px;
      line-height: 40px;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 20px;
        width: 30px;
        border-bottom: 1px dashed #344a5f;
      }
    }
    h4, li{
      transition: all .5s ease;
      &:hover{
        background: #f3f3f3;
        .btns{
          display: block;
        }
      }
    }
  }
  .menu-title{
    line-height: 40px;
    background: #f3f3f3;
    padding-left: 22px;
  }
  .cate-form{
    width: 385px;
    margin-top: 26px;
    .el-form-item{
      margin-bottom: 24px;
    }
  }
}
</style>