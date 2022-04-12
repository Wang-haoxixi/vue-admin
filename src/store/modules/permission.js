import { GetUserRole } from "@/api/user"
// 引入默认路由和动态路由，用于用户系统匹配
import { defaultRouterMap, asyncRouterMap } from "@/router";

const state = {
  // 用户角色
  roles: [],
  // 新增的路由
  newAddRouter: [],
  // 整体所有的路由 ,其默认等于 引入的默认路由
  allRouters: defaultRouterMap,
}
const getters = {
  roles: state => state.roles,
  newAddRouter: state => state.newAddRouter, // 新增的路由
  allRouters: state => state.allRouters, // 整体所有的路由
}
// 提交方法， 改变state中的值（同步）
const mutations = {
  // 修改roles值
  SET_ROLES(state, value) {
    state.roles = value;
    // console.log('roles:', state.roles)
  },
  // 设置路由
  SET_ROUTER(state, router) {
    state.newAddRouter = router; // 匹配出来的动态路由
    state.allRouters = defaultRouterMap.concat(router); // 整体所有路由 = 默认路由 + 匹配出来的动态路由
    // console.log(state.newAddRouter)
    // console.log(state.allRouters)
  }
}
const actions = {// 提交mutations中的方法并运行 (直接commit中的方法，或运行异步代码返回出去，回调处理事情)

  // 获取用户角色
  GET_USER_ROLE(content, state) {
    return new Promise((res, rej) => {
      GetUserRole().then(response => {
        let roles = response.data.data.role;
        // 调用mutations中的 SET_ROLES 给roles赋值
        content.commit("SET_ROLES", roles);
        // GetUserRole接口需要调用成功后才能进入下一步
        res(roles); // 此时表示接口已经调用成功
      }).catch(error => { })
    })
  },

  // 创建动态路由
  GET_ASYNC_ROUTER(content, data) {
    return new Promise((res, rej) => {
      // ['infoSystem', 'userSystem',] 拿到data角色,将其存储起来,通过返回的角色来进行路由的匹配
      let role = data;

      let newAddRouter = [];

      if (role.includes("admin")) { // 超级管理员
        newAddRouter = asyncRouterMap;

      } else { // 普通管理员
        // 对引入的动态路由进行过滤，与role用户角色进行匹配，过滤出对应的动态路由
        newAddRouter = asyncRouterMap.filter(item => {
          // ES6 includes() 数组方法判断动态路由中的每一项的system是否包含与role用户角色中，若是就将该路由返回出去赋值
          if (role.includes(item.meta.system)) {
            return item;
          }
        })
      }






      // 匹配得到该用户的角色所对应的动态路由后， 调用mutations中的SET_ROUTER方法，更新路由
      content.commit("SET_ROUTER", newAddRouter);
      // 处理完路由后要告诉外面路由已经更新完毕
      res("Route update completed.")
    })
  }

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
