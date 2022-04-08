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
        <tableComponent :config="data.tableConfig">
            <template v-slot:status="slotData">
                {{ slotData.data.name }}
                <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation="slotData">
                <el-button size="mini" type="danger" @click="handleDelete(slotData.data)">删除</el-button>
                <el-button size="mini" type="success" @click="handleEdit(slotData.data)">编辑</el-button>
            </template>
        </tableComponent>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import selectComponent from "@/components/select"
import tableComponent from "@/components/Table"
import { requestUrl } from "@/api/requestUrl"
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
                    {
                        label: "禁启用状态",
                        value: "status",
                        width: 150,
                        colType: "slot", // 区分当前列的类型：插槽模式
                        slotName: "status", // 具名插槽名称
                    },
                    {
                        label: "操作",
                        width: 200,
                        colType: "slot", // 区分当前列的类型：插槽模式
                        slotName: "operation", // 具名插槽名称
                    },
                ],
                // 请求接口URL
                requestData: {
                    url: requestUrl.getUserUrl,
                    method: "post",
                    data: {
                        pageNumber: 1,
                        pageSize: 10,
                    }
                },
            },

        })

        // -----------------------------------------------------------------
        // 删除
        const handleDelete = (data) => {
            console.log(data);
        };
        // 编辑
        const handleEdit = (data) => {
            console.log(data);
        }

        return {
            data,
            handleDelete,
            handleEdit
        }
    }
};
</script>

<style lang="scss" scoped>
#userIndex {
}
</style>