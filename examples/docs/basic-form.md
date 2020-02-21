<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-20 18:09:47
 * @Description: file content description
 -->
# Basic Form 基础表单

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


基础表单：<!-- {.md} --> 用来动态渲染表单组件，组件支持表单验证，详细使用方式见下文 <!-- {.md} -->。

> 详细文档[TODO]

<basic-form-demo></basic-form-demo>

::: demo

```html
export default {
  name: 'basic-form-demo',
  data: function() {
    return {
      formConfig: [{
        label: '苹果名称',
        placeholder: '请输入苹果名称',
        type: 'string',
        uuid: '54d0d1c7-8465-4600-82b1-1d327d97c427',
        dataCode: 'rule_apple.apple_name',
        componentName: 'dap-ui-input',
        rowSpan: 2,
        colSpan: 1,
        labelColor: '#eee',
        visiable: true,
      }, {
        label: '苹果类型',
        placeholder: '请输入苹果类型',
        type: 'string',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d6f',
        dataCode: 'rule_apple.app_type',
        componentName: 'dap-ui-input',
        rowSpan: 2,
        colSpan: 1,
        required: true,
        labelColor: '#000',
        visiable: true,
      }, {
        label: '苹果类型描述',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d61',
        componentName: 'dap-ui-static-text',
        rowSpan: 4,
        colSpan: 1,
        labelColor: '#666',
        visiable: true,
      }, {
        label: '苹果类型描述',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d61',
        componentName: 'dap-ui-select',
        rowSpan: 4,
        colSpan: 1,
        labelColor: '#666',
        visiable: true,
      }, {
        label: '苹果价格',
        uuid: 'c29c65b8-b715-4fec-82e1-de1d4aef1160',
        componentName: 'dap-ui-collapse-layout',
        rowSpan: 4,
        colSpan: 2,
        visiable: true,
        children: [{
          label: '默认标签页',
          visiable: true,
          labelColor: '#000',
          children: [{
            label: '苹果价格',
            placeholder: '请输入苹果价格',
            type: 'string',
            uuid: '4c9ec8b9-c007-4120-97dd-902d5cb29379',
            dataCode: 'rule_apple.apple_price',
            componentName: 'dap-ui-input',
            rowSpan: 2,
            colSpan: 1,
            labelColor: '#000',
            visiable: true,
            required: true,
          }]
        }]
      }, {
        label: '被保险人清单',
        uuid: '196be4f4-728b-45af-8f10-a02c82110413',
        dataCode: 'rule_apple.list',
        componentName: 'dap-ui-table-extend',
        rowSpan: 4,
        colSpan: 2,
        visiable: true,
        columnSet: JSON.parse(`[{"formControlName":"insurer_list.account","title":"被保险人账号", "required": true},{"formControlName":"insurer_list.name","title":"被保险人姓名"},{"formControlName":"insurer_list.email","title":"被保险人邮箱"},{"formControlName":"insurer_list.birth","title":"出生日期"},{"formControlName":"insurer_list.start_date","title":"保险开始日期"},{"formControlName":"insurer_list.end_date","title":"保险结束日期"}]`)
      }],
      formData: {
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.formData = {
        // 'rule_apple.app_type': '山东',
        'rule_apple.list': JSON.parse(
          '[{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"}]'
        )
      }
    }, 1500)
  },
  methods: {
    reset() {
      this.$refs.basicFormDemo.resetForm();
      this.formData = {
        // 'rule_apple.app_type': '山东'
      }
    }
  }
}

<template>
  <div class="demo-block">
    <dap-ui-basic-form :formConfig="formConfig" v-mode="formData"></dap-ui-basic-form> 
  </div>
</template>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | -------- |
|  formConfig   |    表单配置    |  Array<ItemConfig>  |   -   |     -     | 
|  formData   |    表单数据    |  Object  |   -    |      -   | 

### FormConfig.ItemConfig <compTpe = 'FORM_STATIC_RENDER'>
| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | -------- |
|  label   |    标题显示    |  String  |   -   |     -     | 
|  type   |   组件对应返回的数据类型    |  String  |   -    |      -   | 
|  uuid   |   组件的uuid    |  String  |   -    |      -   | 
|  componentName   |   组件名称 (中划线命名)    |  String  |   -    |      -   | 
|  rowSpan   |   横向占用的距离(最大为4，4为100%)    |  String  |   -    |      -   | 
|  colSpan   |   纵向占用的距离(最大为8，1的最小高度为 60px)    |  String  |   -    |      -   | 
|  visiable   |   是否可见    |  Boolean  |   -    |      -   | 
|  labelColor   |   颜色    |  Color  |   -    |      -   | 
|  extraProp   |   额外参数    |  Object  |   -    |      -   | 


### FormConfig.ItemConfig <compTpe = 'FORM_INPUT'>
| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | -------- |
|  label   |    标题显示    |  String  |   -   |     -     | 
|  type   |   组件对应返回的数据类型    |  String  |   -    |      -   | 
|  uuid   |   组件的uuid    |  String  |   -    |      -   | 
|  dataCode   |   数据绑定的code    |  String  |   -    |      -   | 
|  componentName   |   组件名称 (中划线命名)    |  String  |   -    |      -   | 
|  rowSpan   |   横向占用的距离(最大为4，4为100%)    |  String  |   -    |      -   | 
|  colSpan   |   纵向占用的距离(最大为8，1的最小高度为 60px)    |  String  |   -    |      -   | 
|  required   |   是否必填    |  Boolean  |   -    |      -   | 
|  visiable   |   是否可见    |  Boolean  |   -    |      -   | 
|  labelColor   |   颜色    |  Color  |   -    |      -   | 
|  extraProp   |   额外参数    |  Object  |   -    |      -   | 
| disabled    |  禁用       | Boolean   |        |           | 


### FormConfig.ItemConfig <compTpe = 'FORM_LAYOUT'>
| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | -------- |
|  label   |    标题显示    |  String  |   -   |     -     | 
|  type   |   组件对应返回的数据类型    |  String  |   -    |      -   | 
|  uuid   |   组件的uuid    |  String  |   -    |      -   | 
|  componentName   |   组件名称 (中划线命名)    |  String  |   -    |      -   | 
|  rowSpan   |   横向占用的距离(最大为4，4为100%)    |  String  |   -    |      -   | 
|  colSpan   |   纵向占用的距离(最大为8，1的最小高度为 60px)    |  String  |   -    |      -   | 
|  required   |   是否必填    |  Boolean  |   -    |      -   | 
|  labelColor   |   颜色    |  Color  |   -    |      -   | 
|  chlidren   |   布局配置    |  Array<LayoutConfig>  |   -    |      -   | 
|  extraProp   |   额外参数    |  Object  |   -    |      -   | 


### FormConfig.ItemConfig.LayoutConfig 
| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | -------- |
|  label   |    标题显示    |  String  |   -   |     -     | 
|  index   |   布局索引    |  String  |   -    |      -   | 
|  active   |   是否开启    |  Boolean  |   -    |      -   | 
|  labelColor   |   颜色    |  Color  |   -    |      -   | 
|  chlidren   |   表单配置，布局中子表单    |  Array<ItemConfig>  |   -    |      -   | 

## Method
| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | -------- |
|  validateTouch   |    触发验证    |  Function  |   -   |     -     | 
|  reset   |    重置表单    |  Function  |   -   |     -     | 
|  getValidateError   |    获取验证信息    |  Function  |   -   |     -     | 


## 表单使用

表单组件接收2个参数`FormData`和`FormConfig`，`FormData`的数据，
> `FormConfig`为表单配置项，主要用来配置表单显示组件
> `FormData`为表单输入数据，支持多种类型的数据，支持在单个组件中绑定多个表单数据，若需要此操作，则需要自定义设置`dataCode`

1. `FormConfig`表单格式如下：
```js
[{
  label: '苹果名称',
  placeholder: '请输入苹果名称',
  type: 'string',
  uuid: '54d0d1c7-8465-4600-82b1-1d327d97c427',
  dataCode: 'rule_apple.apple_name',
  componentName: 'dap-ui-input',
  rowSpan: 2,
  colSpan: 1,
  labelColor: '#666',
  visiable: true,
}, {
  label: '苹果类型',
  placeholder: '请输入苹果类型',
  type: 'string',
  uuid: '53f14f71-8100-4d66-b89f-b30168c26d6f',
  dataCode: 'rule_apple.app_type',
  componentName: 'dap-ui-input',
  rowSpan: 2,
  colSpan: 1,
  required: true,
  labelColor: '#000',
  visiable: true,
  disabled: true,
}, {
  label: '苹果类型描述',
  uuid: '53f14f71-8100-4d66-b89f-b30168c26d61',
  componentName: 'dap-ui-static-text',
  rowSpan: 4,
  colSpan: 1,
  labelColor: '#666',
  visiable: true,
}, {
  label: '苹果价格区域',
  uuid: 'c29c65b8-b715-4fec-82e1-de1d4aef1160',
  componentName: 'dap-ui-collapse-layout',
  rowSpan: 4,
  colSpan: 2,
  visiable: true,
  children: [{
    label: '苹果价格',
    placeholder: '请输入苹果价格',
    type: 'string',
    uuid: '4c9ec8b9-c007-4120-97dd-902d5cb29379',
    dataCode: 'rule_apple.apple_price',
    componentName: 'dap-ui-input',
    rowSpan: 2,
    colSpan: 1,
    labelColor: '#000',
    visiable: true,
    required: true,
  }]
}]
```

2. 表单Item通用配置项
| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | --------- |
| uuid  |    组件ID    | String   |        |           | 
| componentName   |  组件TAG(<component :is="componentName">)    | String   |        |           | 
| rowSpan    |   组件的横向占用比例(25%~100%)    | String(1~4) |        |           | 
| colSpan    |   组件的纵向占用高度(60px~480px)    | String(1~8) |        |           | 
| visiable   |   是否可见      | Boolean   |        |           | 
| extraProp   |   额外配置      | Object   |        |           | 


3. 输入组件特有配置项(针对可输入组件配置)
| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | --------- |
| label  |    标题文件    | String   |        |           | 
| placeholder   |  显示提示文本  | String   |        |           | 
| dataCode    |   组件绑定的数据值   | String(1~4) |        |           | 
| required    |   是否必填   | String(1~8) |        |           | 
| labelColor  |    显示标题文本颜色    | Boolean   |        |           | 

4. 布局组件配置项(针对布局组件配置)
| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | --------- |
|  chlidren   |   布局配置    |  Array<LayoutConfig>  |   -    |      -   | 

5. 静态显示组件配置项(针对布局组件配置)
通用组件即可


### 按配置添加数据
1. `FormData`表单数据格式如下：根据Form提供的`dataCode`, 将数据平铺在此对象中

### DAP转换
1. 根据DAP需求，将DAP现有配置简单转换为现有配置，需要使用Util类，Adapter注入，每个组件单独注入注册

## 新组件开发

### 组件库内新组件开发
1. 组件库内组件开发，分 数据组件，布局组件，渲染组件 三种
具体分辨参考`dap-ui-input`, `dap-ui-static-text`, `dap-ui-collapse-layout` 三个组件。具体实现如下

#### 输入组件属性定义

##### 输入组件需要定义以下属性
name: 
compType: FORM_INPUT,
mixins: [InputComponentMixin, BasicComponentMixin]
props: {}

##### v-model 绑定如下
v-model的属性 绑定props的value属性，和@change事件

##### 组件注册
将属性放在 `packages/index.js` 的 formComponents 组件中

### 非组件库内新组件开发
调用 this.$baseFormRegister.registerComponent(formComponent.name, formComponent.type, formComponent) 方法，注册到组件中。
并需要调用 Vue.component(formComponent.name, formComponent) 将组件注册成全局组件
