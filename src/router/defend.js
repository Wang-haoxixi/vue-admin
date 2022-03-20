
/**
 * 防止非法进入控制台(安全处理,通过有无token进行判断)
*/

import store from "../store/index"
import router from "./index";
import { getToken, removeToken, removeUserName } from '@/utils/app.js'

// 设置白名单
const whiteRoute = ["/login"];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    /**
     * 1、to == /console
     * 2、tp == /index
    */
    // console.log('存在tk')
    if (to.path === "/login") {
      // 若用户直接退出到登录页，则清除token，再次进入控制台需要重新登录
      removeToken();
      removeUserName();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      next();//放行进入到index控制台页面 直接放行当前的to.path，不会再进入beforeEach循环中
    }
  } else {
    // console.log('不存在tk')
    if (whiteRoute.indexOf(to.path) === -1) {
      next('login') // 路由指向
    } else {
      next() // to
    }
    next()//放行
  }
  // console.log(to)//进入下一个页面
  // console.log(from)//离开之前的页面（上一个）
})