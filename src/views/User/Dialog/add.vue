<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="576px" @opened="dialogOpened">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="用户名：">
                    <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="地区：">
                    <!-- region: 绑定的数据; getRegionFn: 返回数据的函数; level: 配置省市区街显隐 -->
                    <!-- <cityPicker :level="['province', 'city', 'area']" :region="regionData.data" @getRegionFn="getRegion" /> -->
                    <cityPicker :region="regionData.data" @getRegionFn="getRegion" />
                    {{ regionData.data }}
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-radio-group v-model="status">
                        <el-radio :label="1">禁用</el-radio>
                        <el-radio :label="2">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色：">
                    <el-checkbox-group v-model="roleCheckList">
                        <el-checkbox v-for="(item, index) in roleItem.data" :key="index" :label="item.role">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_info_flag = false">取 消</el-button>
                <el-button type="danger" @click="submit" :loading="loading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
import cityPicker from "@/components/CityPicker"
import { Add } from "@/api/news.js";
import { GetRoles } from "@/api/user"
export default {
    name: "dialogInfo",
    components: {
        cityPicker,
    },
    props: {
        flag: {
            type: Boolean,
            default: false,
        },
        infoCate: {
            type: Array,
            default: () => [],
        }
    },
    setup(props, { root, emit, refs }) {
        const loading = ref(false);
        // 地区数据
        const regionData = reactive({
            data: {}
        });
        // 是否启用
        const status = ref(1);
        // 角色选择
        const roleCheckList = reactive(["sale"]);
        // 角色项
        const roleItem = reactive({
            data: [],
        });
        // 控制弹框显隐
        const dialog_info_flag = ref(false);
        const form = reactive({
            category: "",
            title: "",
            content: "",
        })
        const options = reactive({
            cateList: [],
        });

        // dialog弹窗关闭后触发
        const close = () => {
            // emit("close"); // 需要做逻辑处理时用回调的方式触发父组件方法
            emit("update:flag", false); // 无逻辑处理时可以使用 .sync 修饰符的方式来处理
        };


        // 确定添加信息
        const submit = () => {
            loading.value = true;
            let requestData = {
                category_id: form.category,
                title: form.title,
                content: form.content,
            }
            Add(requestData).then(response => {
                if (response.data.resCode == 0) {
                    root.$message.success(response.data.message);
                    loading.value = false;
                    dialog_info_flag.value = false;
                    form.category = "";
                    form.title = "";
                    form.content = "";
                    emit("addInfoFn");
                }
            }).catch(() => {
                loading.value = false;
            })
        };

        const getRegion = (data) => {
            regionData.data = data
        };

        const getRoles = (data) => {
            GetRoles().then(response => {
                roleItem.data = response.data.data;
            })
        };

        // 对话框弹出来后执行
        const dialogOpened = () => {
            getRoles();
        };




        // 侦听父组件传进来flag的变化，若变化了，给dialog_info_flag重新赋值
        watch(() => props.flag, (newVal, oldVal) => {
            dialog_info_flag.value = newVal;
        });

        return {
            loading,
            regionData,
            status,
            roleCheckList,
            roleItem,
            form,
            dialog_info_flag,
            options,
            close,
            dialogOpened,
            submit,
            getRegion,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>