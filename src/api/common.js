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