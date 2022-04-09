import service from "@/utils/request.js";

// 获取七牛云token
export function QiniuToken(data) {
    return service.request({
        method: 'post',
        url: '/uploadImgToken/',
        data,
    })
}

// 请求表格数据
export function getTableList(params) {
    return service.request({
        method: params.method || "post",
        url: params.url,
        data: params.data || {},
    })
}

// 获取省市区关联
export function getCityPicker(data) {
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}