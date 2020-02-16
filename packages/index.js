/*
 * @Author: DevinShi
 * @Date: 2020-02-06 03:27:31
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-13 15:01:09
 * @Description: file content description
 */
import DapUiButton from "./components/form/button/dap-ui-button.vue";
import DapUiInput from "./components/form/input/dap-ui-input.vue";
import DapUiBasicForm from "./components/form/form/dap-ui-basic-form.vue";
import DapUiBasicFormItem from "./components/form/form-item/dap-ui-basic-form-item.vue";
// 表格组件
import DapUiTable from "./components/table/dap-ui-table.vue";
// 弹窗组件
import DapUiModal from './components/modal/dap-ui-modal.vue';

import * as REQ_CONSTANT from './plugins/request/request.constant.js'

import LodashPlugin from './plugins/lodash/lodash.js'

import RequestPlugin from './plugins/request/request.js'

import Vuelidate from 'vuelidate';


// 存储组件列表
const components = [ DapUiButton, DapUiInput, DapUiBasicForm, DapUiBasicFormItem, DapUiTable, DapUiModal];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if ((install).installed) return;
  // 遍历注册全局组件
  components.forEach(component => {
    console.log(component.name)
    Vue.component(component.name, component)
  });
};

// 使用表单验证器
Vue.use(Vuelidate);

// 判断是否是直接引入文件
if (typeof window !== "undefined" && (window).Vue) {
  install((window).Vue);
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  DapUiButton,

  DapUiInput,

  DapUiBasicForm,

  DapUiBasicFormItem,

  DapUiTable,
  DapUiModal,
};

export {
  // 请求定义常量
  REQ_CONSTANT,
  // 请求插件
  RequestPlugin,
  // lodash插件
  LodashPlugin
}