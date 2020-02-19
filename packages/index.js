/*
 * @Author: DevinShi
 * @Date: 2020-02-06 03:27:31
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 08:28:02
 * @Description: file content description
 */
import Vuelidate from 'vuelidate'

import DapUiButton from "./components/form/button/dap-ui-button.vue";
import DapUiInput from "./components/form/input/dap-ui-input.vue";
import DapUiSelect from "./components/form/select/dap-ui-select.vue";

import DapUiStaticText from "./components/form/static-text/dap-ui-static-text.vue";
import DapUiBasicForm from "./components/form/form/dap-ui-basic-form.vue";
import DapUiBasicFormItem from "./components/form/form-item/dap-ui-basic-form-item.vue";

import DapUiCollapseLayout from "./components/form/collapse-layout/dap-ui-collapse-layout.vue";

// 表格组件
import DapUiTable from "./components/table/dap-ui-table.vue";
// 弹窗组件
import DapUiModal from './components/modal/dap-ui-modal.vue';

import * as REQ_CONSTANT from './plugins/request/request.constant.js'

import LodashPlugin from './plugins/lodash/lodash.js'

import RequestPlugin from './plugins/request/request.js'

import BasicFormRegisterPlugin from './plugins/form/basic-form.plugin.js'

// 表单组件列表
const formComponents = [ DapUiInput, DapUiSelect, DapUiStaticText, DapUiCollapseLayout];

// 所有组件列表
const components = [...formComponents, DapUiButton, DapUiBasicForm, DapUiBasicFormItem, DapUiTable, DapUiModal];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if ((install).installed) return;

  // 使用表单验证器
  Vue.use(Vuelidate);

  // 使用表单注册插件
  Vue.use(BasicFormRegisterPlugin);

  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  formComponents.forEach(formComponent => {
    if (formComponent.name && formComponent.type) {
      Vue.prototype.$baseFormRegister.registerComponent(formComponent.name, formComponent.type, formComponent)
    }
  })
};

// // 判断是否是直接引入文件
// if (typeof window !== "undefined" && (window).Vue) {
//   install((window).Vue);
// }

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  DapUiButton,

  DapUiInput,

  DapUiStaticText,
  
  DapUiBasicForm,

  DapUiBasicFormItem,

  DapUiCollapseLayout,

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