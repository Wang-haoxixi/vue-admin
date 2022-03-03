import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 是否收缩菜单
    isCollapse: false,
  },
  getters: {},
  // 提交方法， 改变state中的值（同步）
  mutations: {
    // 改变导航菜单收缩状态
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      console.log('菜单状态isCollapse变化..', state.isCollapse)
    },
  },
  actions: {},
  modules: {},
});