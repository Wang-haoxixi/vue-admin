import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 是否收缩菜单
    isCollapse: false,
    count: 20,
  },
  getters: {
    countAdd(state) {
      return state.count + 10
    }
  },
  // 提交方法， 改变state中的值（同步）
  mutations: {
    // 改变导航菜单收缩状态
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      console.log('菜单状态变化..', state.isCollapse)
    },


    SET_COUNT(state, val) {
      state.count = val;
      console.log('count被改变了...', state.count)
    }
  },
  actions: {},
  modules: {},
});
