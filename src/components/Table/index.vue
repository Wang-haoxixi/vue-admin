<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <!-- 多选项 -->
            <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
            <!-- 数据渲染 -->
            <el-table-column v-for="(item, index) in data.tableConfig.tHeaders" :key="index" :prop="item.value" :label="item.label" :width="item.width"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeMount } from "@vue/composition-api";
export default {
    name: "tableComponent",
    props: {
        config: {
            type: Object,
            default: () => { }
        }
    },
    setup(props, { root }) {
        const data = reactive({
            tableConfig: { // 表格配置
                selection: false, // 是否显示多选项
                tHeaders: [], // 表头设置
            },
            tableData: [
                {
                    email: '409019683@qq.com',
                    name: '王小虎',
                    phone: '13588888888',
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                },
                {
                    email: '409019683@qq.com',
                    name: '王小虎',
                    phone: '13588888888',
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                },
            ]
        });

        // 循环遍历赋值
        const initTableConfig = () => {
            let propConfig = props.config;
            for (let key in propConfig) {
                data.tableConfig[key] = propConfig[key];
            }
        };

        onBeforeMount(() => {
            initTableConfig();
            data.tableConfig.selection = props.config.selection;
            data.tableConfig.tHeaders = props.config.tHeaders;
        })

        return {
            data,
        }
    }
}
</script>

<style lang="scss" scoped>
</style>