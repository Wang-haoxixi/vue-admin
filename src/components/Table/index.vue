<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <!-- 多选项 -->
            <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
            <template v-for="(item, index) in data.tableConfig.tHeaders">
                <!-- 插槽 -->
                <el-table-column :key="index" :prop="item.value" :label="item.label" :width="item.width" v-if="item.colType === 'slot'">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!-- 文本数据渲染 -->
                <el-table-column :key="index" :prop="item.value" :label="item.label" :width="item.width" v-else></el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeMount, watch } from "@vue/composition-api";
import { getTableList } from "@/api/common";
import { tableLoadData } from "./tableLoadData"
export default {
    name: "tableComponent",
    props: {
        config: {
            type: Object,
            default: () => { }
        }
    },
    setup(props, { root }) {
        const { resData, loadData } = tableLoadData();

        const data = reactive({
            tableConfig: { // 表格配置
                requestData: {}, // 请求所需数据
                selection: false, // 是否显示多选项
                tHeaders: [], // 表头设置
            },
            tableData: [
                {
                    email: '409019683@qq.com',
                    name: '张三',
                    phone: '13588888888',
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                },
                {
                    email: '409019683@qq.com',
                    name: '李四',
                    phone: '13588888888',
                    address: '上海市普陀区金沙江路 1518 弄',
                    role: '超级管理员',
                },
            ]
        });

        // 循环遍历赋值
        const initTableConfig = () => {
            let propConfig = props.config;
            let keys = Object.keys(data.tableConfig); // 获取到所有的key键
            for (let key in propConfig) {
                if (keys.includes(key)) { // 判断keys集合中是否有传进来的key键，若有就替换值
                    data.tableConfig[key] = propConfig[key];
                }
            }
        };

        onBeforeMount(() => {
            initTableConfig();
            loadData(data.tableConfig.requestData);
        })

        // 监听表格数据的变化
        watch(() => resData.item, newValue => {
            data.tableData = resData.item; // 表格数据赋值渲染
        }, { deep: true, immediate: true })

        return {
            data,
        }
    }
}
</script>

<style lang="scss" scoped>
</style>