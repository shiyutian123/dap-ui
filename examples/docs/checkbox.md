<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 14:59:24
 * @Description: file content description
 -->
# Checkbox 多选框

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<checkbox-demo></checbox-demo>

::: demo

```js
export default {
  name: 'checkbox-demo',
  data: function() {
    return {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
        value: ['1'],
        options: [{
            value: '1',
            label: '111',
        }, {
            value: '2',
            label: '222',
        }],
    }
  }
}

```
```html
<div class="demo-block">
    <dap-ui-checkbox 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="checkbox"
      :hasFeedback="false"
      :options="options"
      :extraProp="extraProp"
      @formEventEmit="formEvent"></dap-ui-checkbox>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
