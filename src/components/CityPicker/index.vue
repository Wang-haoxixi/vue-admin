<template>
    <!-- 城市选择组件 -->
    <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select placeholder="请选择" v-model="data.provinceValue" @change="handleProvince">
                    <el-option v-for="(item, index) in data.provinceData" :key="index" :label="item.PROVINCE_NAME" :value="item.PROVINCE_CODE"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="请选择" v-model="data.cityValue" @change="handleCity">
                    <el-option v-for="(item, index) in data.cityData" :key="index" :label="item.CITY_NAME" :value="item.CITY_CODE"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="请选择" v-model="data.areaValue" @change="handleArea">
                    <el-option v-for="(item, index) in data.areaData" :key="index" :label="item.AREA_NAME" :value="item.AREA_CODE"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="请选择" v-model="data.streetValue" @change="handleStreet">
                    <el-option v-for="(item, index) in data.streetData" :key="index" :label="item.STREET_NAME" :value="item.STREET_CODE"></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { watch } from "@vue/composition-api";
import { cityPicker } from "@/utils/cityPicker";
export default {
    name: "cityPicker",
    props: {
        region: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    setup(props, { root, emit }) {
        const {
            // // 数据
            // provinceData, cityData, areaData, streetData,
            // // 绑定值
            // provinceValue, cityValue, areaValue, streetValue,
            data,
            resData, // 最终城市数据集
            getProvinces,
            // 操作
            handleProvince, handleCity, handleArea, handleStreet
        } = cityPicker();

        // ------------------------------------------------------------


        // 监听地区四个值的改变，只有有改变的，就给region重新赋值
        watch([
            () => resData.provinceValue,
            () => resData.cityValue,
            () => resData.areaValue,
            () => resData.streetValue,
        ], ([provinceValue, cityValue, areaValue, streetValue]) => {
            emit("getRegionFn", resData);
        })



        getProvinces();

        return {
            // 下拉操作
            handleProvince, handleCity, handleArea, handleStreet,
            // // 数据
            // provinceData, cityData, areaData, streetData,
            // // 绑定值
            // provinceValue, cityValue, areaValue, streetValue,
            data,
        }
    }
}
</script>

<style lang="scss" scoped>
</style>