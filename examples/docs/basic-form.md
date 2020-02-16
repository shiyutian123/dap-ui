<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 14:48:18
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
      }],
      formData: {
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.formData = {
        // 'rule_apple.app_type': '山东'
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

## 组件库使用

### 按配置添加数据

### DAP转换

## 新组件开发

### 组件库内新组件开发

### 非组件库内新组件开发