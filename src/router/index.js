import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
    hidden: true,
    meta: {
      name: "登录",
    },
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    component: () => import("../views/Layout/index.vue"),
    meta: {
      name: "控制台",
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/Console/index.vue"),
        meta: {
          name: "首页",
        },
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
