<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-12 01:29:56
 * @Description: file content description
 -->
# Basic Form 基础表单

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

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
        fontColor: '#000'
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
        fontColor: '#000'
      }],
      formData: {}
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
|  formConfig   |    表单配置    |  Object  |   -   |     -     | 
|  formData   |    表单数据    |  Object  |   -    |      -   | 
