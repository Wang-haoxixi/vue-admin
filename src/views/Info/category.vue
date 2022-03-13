<template>
  <div class="infoCate-warp">
    <el-button type="danger">添加一级分类</el-button>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="cate-item">
          <h4 class="clearfloat">
            <svg-icon iconName="plus"></svg-icon>
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
        <div class="cate-item">
          <h4 class="clearfloat">
            <svg-icon iconName="plus"></svg-icon>
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
            <el-input v-model="form.firstName"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：">
            <el-input v-model="form.secondName"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
import SvgIcon from '../../icons/SvgIcon.vue';
export default {
  components: { SvgIcon },
  name: "infoCate",
  setup(){
    const form = reactive({
      firstName: "",
      secondName: "",
    })
    return{
      form
    }
  }
};
</script>

<style lang="scss" scoped>
.infoCate-warp {
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