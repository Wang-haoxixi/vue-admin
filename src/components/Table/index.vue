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

        <el-pagination v-if="data.tableConfig.pagination" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageData.currentPage" :page-sizes="pageData.pageSizeArray" :page-size="pageData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageData.total"></el-pagination>
    </div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeMount, watch } from "@vue/composition-api";
import { tableLoadData } from "./tableLoadData"
import { pagination } from "./pagination"
export default {
    name: "tableComponent",
    props: {
        config: {
            type: Object,
            default: () => { }
        }
    },
    setup(props, { root }) {
        // 加载数据
        const { resData, loadData } = tableLoadData();
        // 分页
        const { pageData, handleSizeChange, handleCurrentChange, totalCount } = pagination();

        const data = reactive({
            tableConfig: { // 表格配置
                requestData: {}, // 请求所需数据
                selection: false, // 是否显示多选项
                tHeaders: [], // 表头设置,
                pagination: true, // 是否显示页码
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

        // 监听表格数据的变化         监听总数的变化    --->    监听多个数据的变化
        watch([() => resData.item, () => resData.total,], ([tableData, total]) => {
            data.tableData = tableData; // 表格数据赋值渲染
            totalCount(total); // 调用总数函数
        }, { deep: true, immediate: true });

        // 监听当前页和每页数量
        watch([() => pageData.currentPage, () => pageData.pageSize,], ([currentPage, pageSize]) => {
            let requestData = data.tableConfig.requestData;
            if (requestData.data) {
                requestData.data.pageNumber = currentPage;
                requestData.data.pageSize = pageSize;
                loadData(requestData);
            }
        }, { deep: true, immediate: true })

        return {
            data, pageData,
            handleSizeChange, handleCurrentChange,
        }
    }
}
</script>

<style lang="scss" scoped>
</style>