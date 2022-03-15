/**
 * 信息分类
 */
import service from "@/utils/request.js";

// 添加一级
export function AddParent(data) {
    return service.request({
        method: 'post',
        url: '/news/addFirstCategory/',
        data
    })
}