/**
 * 用户
 */
import service from "@/utils/request.js";
export function GetRoles(data) {
    return service.request({
        method: 'post',
        url: '/role/',
        data,
    })
}