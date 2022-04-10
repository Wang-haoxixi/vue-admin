<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="576px" @opened="dialogOpened">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="form.username" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="truename">
                    <el-input v-model="form.truename" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone">
                    <el-input v-model.number="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="地区：" prop="region">
                    <!-- region: 绑定的数据; getRegionFn: 返回数据的函数; level: 配置省市区街显隐 -->
                    <!-- <cityPicker :level="['province', 'city', 'area']" :region="regionData.data" @getRegionFn="getRegion" /> -->
                    <cityPicker :region="regionData.data" @getRegionFn="getRegion" />
                </el-form-item>
                <el-form-item label="是否启用：" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">禁用</el-radio>
                        <el-radio :label="2">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色：" prop="role">
                    <el-checkbox-group v-model="form.role">
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
import { GetRoles, UserAdd } from "@/api/user"
export default {
    name: "dialogAdd",
    components: {
        cityPicker,
    },
    props: {
        flag: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { root, emit, refs }) {
        const loading = ref(false);
        const form = reactive({
            username: "",
            truename: "",
            password: "",
            phone: "",
            region: "",
            status: 1,
            role: [],
            // btnPerm: "",
        })
        // 地区数据
        const regionData = reactive({
            data: {}
        });
        // 角色项
        const roleItem = reactive({
            data: [],
        });
        // 控制弹框显隐
        const dialog_info_flag = ref(false);

        // dialog弹窗关闭后触发
        const close = () => {
            // emit("close"); // 需要做逻辑处理时用回调的方式触发父组件方法
            emit("update:flag", false); // 无逻辑处理时可以使用 .sync 修饰符的方式来处理
        };


        // 重置表单
        const reset = () => {
            refs.form.resetFields();
        };

        // 确定添加信息
        const submit = () => {
            loading.value = true;
            let requestData = JSON.parse(JSON.stringify(form));
            requestData.role = requestData.role.join();
            requestData.region = JSON.stringify(regionData.data);

            UserAdd(requestData).then(res => {
                loading.value = false;
                reset(); // 重置表单
                regionData.data = {};
                dialog_info_flag.value = false
            }).catch(err => {
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
            form,
            regionData,
            roleItem,
            dialog_info_flag,
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