<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 15:03:59
 * @Description: file content description
 -->
# Button 基础按钮

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<collapse-layout-demo></collapse-layout-demo>

::: demo

```html

export default {
  name: 'collapse-layout-demo',
  data: function() {
    return {
      layoutConfig: {
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
      },
      formData: {}
    }
  }
}

<template>
  <div class="demo-block">
    <dap-ui-collapse-layout
      :layoutConfig="layoutConfig"
      :formData="formData">
    </dap-ui-collapse-layout>
  </div>
</template>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | --------- |
| layoutConfig    |  布局配置     | Object   |        |           | 
| formData    |    表单数据     | Object   |        |           | 
