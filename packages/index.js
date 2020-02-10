/*
 * @Author: DevinShi
 * @Date: 2020-02-06 03:27:31
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-10 01:14:30
 * @Description: file content description
 */
// 按钮组件
import SdfUiButton from "./components/button/sdf-ui-button.vue";

import * as REQ_CONSTANT from './plugins/request/request.constant.js'

import LodashPlugin from './plugins/lodash/lodash.js'

import RequestPlugin from './plugins/request/request.js'


// 存储组件列表
const components = [ SdfUiButton ];
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
// 判断是否是直接引入文件
if (typeof window !== "undefined" && (window).Vue) {
  install((window).Vue);
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  SdfUiButton,

};

export {
  // 请求定义常量
  REQ_CONSTANT,
  // 请求插件
  RequestPlugin,
  // lodash插件
  LodashPlugin
}