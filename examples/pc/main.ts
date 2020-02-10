/*
 * @Author: DevinShi
 * @Date: 2020-02-06 03:32:09
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-09 16:22:10
 * @Description: file content description
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import demoBlock from './components/demo-block.vue'
// 导入组件库
import DapUi from '../../packages/index';

import { RequestPlugin, LodashPlugin } from '../../packages/index';

import './assets/less/common.less'

console.log(RequestPlugin);
// 注册组件库
Vue.use(DapUi);

Vue.use(LodashPlugin, { name: 'lodash' })

Vue.use(RequestPlugin, {
  baseURL: 'http://k8s.definesys.com:30604',
  timeout: 100000,
})




Vue.config.productionTip = false;

const Demos: any[] = []

function importDemos(r: any) {
  r.keys().forEach((key: any) => {
    Demos.push(r(key).default)
  })
}

importDemos(require.context('../demos', true, /\.vue$/))

Demos.map(component => Vue.component(component.name, component))

Vue.component('demo-block', demoBlock)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

