/*
 * @Author: DevinShi
 * @Date: 2020-02-06 03:27:31
 * @LastEditors: your name
 * @LastEditTime: 2020-03-10 18:52:47
 * @Description: file content description
 */
import Vuelidate from 'vuelidate'

import DapUiButton from "./components/form/button/dap-ui-button.vue";
import DapUiInput from "./components/form/input/dap-ui-input.vue";
import DapUiInputNum from "./components/form/input-num/dap-ui-input-num.vue";
import DapUiInputTel from "./components/form/input-tel/dap-ui-input-tel.vue";
import DapUiInputTextarea from "./components/form/input-textarea/dap-ui-input-textarea.vue";
import DapUiInputMoney from "./components/form/input-money/dap-ui-input-money";
import DapUiInputDate from "./components/form/input-date/dap-ui-input-date";
import DapUiInputEmail from "./components/form/input-email/dap-ui-input-email";
import DapUiInputHyperlink from "./components/form/input-hyperlink/dap-ui-input-hyperlink";
import DapUiInputCalcution from "./components/form/input-calculation/dap-ui-input-calculation";

import DapUiSelect from "./components/form/select/dap-ui-select.vue";
import DapUiRadio from "./components/form/radio/dap-ui-radio.vue";
import DapUiCheckbox from "./components/form/checkbox/dap-ui-checkbox.vue";
import DapUiSwitch from "./components/form/switch/dap-ui-switch.vue";
import DapUiMarking from "./components/form/marking/dap-ui-marking.vue";
import DapUiEditor from "./components/form/editor/dap-ui-editor";

import DapUiPersonSelect from "./components/form/person-select/dap-ui-person-select.vue";
import DapUiOrgSelect from "./components/form/org-select/dap-ui-org-select.vue";

import DapUiStaticText from "./components/form/static-text/dap-ui-static-text.vue";
import DapUiBasicForm from "./components/form/form/dap-ui-basic-form.vue";
import DapUiBasicFormItem from "./components/form/form-item/dap-ui-basic-form-item.vue";
import DapUiTableExtend from './components/form/table-extend/dap-ui-table-extend.vue';
import DapUiLov from './components/form/lov/dap-ui-lov.vue';
import DapUiDocument from './components/form/document/dap-ui-document.vue';

import DapUiCollapseLayout from "./components/form/collapse-layout/dap-ui-collapse-layout.vue";
import DapUiTabLayout from "./components/form/tab-layout/dap-ui-tab-layout.vue";

import DapUiAssociateForm from './components/form/associate-form/dap-ui-associate-form.vue'
// 上传图片组件
import DapUiUploadPicture from "./components/form/upload-picture/dap-ui-upload-picture.vue";
// 上传附件组件
import DapUiUploadAttachment from "./components/form/upload-attachment/dap-ui-upload-attachment.vue";

// 静态图片组件
import DapUiStaticPicture from "./components/form/static-picture/dap-ui-static-picture.vue";
// 模板文件组件
import DapUiStaticAttachment from "./components/form/static-attachment/dap-ui-static-attachment.vue";
// 提示符组件
import DapUiStaticTips from "./components/form/static-tips/dap-ui-static-tips.vue";
// 分隔符组件
import DapUiStaticSplit from "./components/form/static-split/dap-ui-static-split.vue";
// 占位符组件
import DapUiStaticPlaceholder from "./components/form/static-placeholder/dap-ui-static-placeholder.vue";

// 网页组件
import  DapUiWeb  from "./components/form/web/dap-ui-web.vue";

import InputComponentMixin from './mixins/input-component-mixin.js';
import BasicComponentMixin from './mixins/basic-component-mixin.js';

// 表格组件
import DapUiTable from "./components/table/dap-ui-table.vue";
// 弹窗组件
import DapUiModal from './components/modal/dap-ui-modal.vue';
// 头像组件
import DapUiAvatar from "./components/avatar/dap-ui-avatar.vue";
// 人员组件
import DapUiPerson from "./components/person/dap-ui-person.vue";
// 头像裁剪弹窗
import DapUiAvatarCropperModal from "./components/avatar-cropper-modal/dap-ui-avatar-cropper-modal.vue";

import DapUiBpmnProcessFlow from './components/bpmn-process-flow/dap-ui-bpmn-process-flow.vue';

import * as REQ_CONSTANT from './plugins/request/request.constant.js'

import LodashPlugin from './plugins/lodash/lodash.js'

import RequestPlugin from './plugins/request/request.js'

import CookiePlugin from './plugins/cookie/cookie.plugin.js'

import VueLsPlugin from './plugins/storage/vue-ls.plugin.js'

import BasicFormRegisterPlugin from './plugins/form/basic-form.plugin.js'

import MomentPlugin from './plugins/moment/moment.plugin.js'

import LoadResourcePlugin from './plugins/load-resource/load-resource.plugin.js';

// 表单组件列表
const formComponents = [ 
  DapUiButton,
  DapUiInput, 
  DapUiSelect, 
  DapUiRadio, 
  DapUiCheckbox, 
  DapUiSwitch,
  DapUiMarking,
  DapUiEditor,
  DapUiInputNum, 
  DapUiInputTel, 
  DapUiInputTextarea, 
  DapUiInputMoney, 
  DapUiInputDate, 
  DapUiInputEmail, 
  DapUiStaticText, 
  DapUiCollapseLayout, 
  DapUiTableExtend, 
  DapUiLov, 
  DapUiDocument, 
  DapUiTabLayout, 
  DapUiUploadPicture,
  DapUiUploadAttachment, 
  DapUiInputHyperlink, 
  DapUiInputCalcution,
  DapUiWeb, 
  DapUiStaticPicture,
  DapUiStaticAttachment,
  DapUiStaticTips,
  DapUiStaticPlaceholder,
  DapUiStaticSplit,
  DapUiPersonSelect,
  DapUiOrgSelect,
  DapUiAssociateForm
];

// 所有组件列表
const components = [...formComponents, DapUiButton, DapUiBasicForm, DapUiBasicFormItem, DapUiTable, DapUiModal, DapUiBpmnProcessFlow, DapUiAvatar, DapUiPerson, DapUiAvatarCropperModal];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if ((install).installed) return;

  Vue.use(CookiePlugin);

  Vue.use(VueLsPlugin);
  
  // 使用表单验证器
  Vue.use(Vuelidate);

  // 使用表单注册插件
  Vue.use(BasicFormRegisterPlugin);

  // 使用异步加载资源插件
  Vue.use(LoadResourcePlugin);
  // 使用日期格式转换插件
  Vue.use(MomentPlugin);

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

  DapUiSelect,
  
  DapUiStaticText,
  
  DapUiBasicForm,

  DapUiBasicFormItem,

  DapUiCollapseLayout,

  DapUiTable,
  
  DapUiModal,

  DapUiBpmnProcessFlow,

  DapUiAvatarCropperModal,
};

export {
  // 请求定义常量
  REQ_CONSTANT,
  // 请求插件
  RequestPlugin,
  // lodash插件
  LodashPlugin,
  // mixins
  InputComponentMixin,
  BasicComponentMixin
}