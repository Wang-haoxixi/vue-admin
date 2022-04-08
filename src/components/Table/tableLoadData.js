import { reactive, ref, onMounted, onBeforeMount } from "@vue/composition-api";
import { getTableList } from "@/api/common";

export function tableLoadData() { // VUE3.0的提炼内容方式
    const resData = reactive({
        item: [], // 表格数据
    });

    const loadData = (params) => { // 请求表格接口获取数据
        let requestData = params
        getTableList(requestData).then(response => {
            // if (response && response.data.data.data.length > 0) {
            resData.item = response.data.data.data
            // }
        }).catch(error => { })
    };

    return {
        resData,
        loadData,
    }
}