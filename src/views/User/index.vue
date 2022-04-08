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
        <tableComponent :config="data.tableConfig" />
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import selectComponent from "@/components/select"
import tableComponent from "@/components/Table"
export default {
    name: "userIndex",
    components: { selectComponent, tableComponent },
    setup(props, { root }) {
        const data = reactive({
            selectOptions: {
                option: ["name", "phone", "email",],
                aa: "aaaaaaa",
            },
            tableConfig: {
                selection: true,
                tHeaders: [
                    {
                      label: "邮箱/用户名",
                      value: "email",
                      width: 200,
                    },
                    {
                      label: "真实姓名",
                      value: "name",
                      width: 120,
                    },
                    {
                      label: "手机号",
                      value: "phone",
                      width: 120,
                    },
                    {
                      label: "地区",
                      value: "address",
                    },
                    {
                      label: "角色",
                      value: "role",
                      width: 150,
                    },
                ],
            },
        })

        return {
            data,
        }
    }
};
</script>

<style lang="scss" scoped>
#userIndex {
}
</style>