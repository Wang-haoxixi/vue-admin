/**
 * 用户
 */

// 获取角色
import service from "@/utils/request.js";
export function GetRoles(data) {
    return service.request({
        method: 'post',
        url: '/role/',
        data,
    })
}

// 添加用户
export function UserAdd(data) {
    return service.request({
        method: 'post',
        url: '/user/add/',
        data,
    })
}

// 编辑用户
export function UserEdit(data) {
    return service.request({
        method: 'post',
        url: '/user/edit/',
        data,
    })
}

// 删除用户
export function UserDelete(data) {
    return service.request({
        method: 'post',
        url: '/user/delete/',
        data,
    })
}

// 用户禁启用
export function UserActives(data) {
    return service.request({
        method: 'post',
        url: '/user/actives/',
        data,
    })
}

