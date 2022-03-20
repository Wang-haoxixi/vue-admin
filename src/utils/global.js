import { MessageBox } from "element-ui";
import { Message } from 'element-ui';

export default {
  install(Vue, option){
    Vue.prototype.confirm = (params) => {
      MessageBox.confirm(params.content, params.tip || '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: params.type,
        center: true
      }).then(() => {
        params.fn && params.fn();
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}