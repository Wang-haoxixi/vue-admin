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

// 
export function UserAdd(data) {
    return service.request({
        method: 'post',
        url: '/user/add/',
        data,
    })
}