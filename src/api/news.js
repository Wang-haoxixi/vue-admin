/**
 * 信息分类
 */
import service from "@/utils/request.js";

// 添加一级
export function AddParent(data) {
    return service.request({
        method: 'post',
        url: '/news/addFirstCategory/',
        data,
    })
}

// 获取信息分类（有子级分类）
export function GetCategory() {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
    })
}

// 修改分类
export function EditCategory(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data,
    })
}

// 删除分类
export function DeleteCategory(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data,
    })
}

// 信息列表
export function GetList(data) {
    return service.request({
        method: "post",
        url: "/news/getList/",
        data,
    })
}

// 添加信息
export function Add(data) {
    return service.request({
        method: "post",
        url: "/news/add/",
        data,
    })
}

// 删除信息
export function deleteInfo(data) {
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data,
    })
}