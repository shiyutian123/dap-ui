<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:33:01
 * @Description: file content description
 -->
# Document 单据号组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<document-demo></document-demo>

::: demo

```js
export default {
  name: 'document-demo',
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
        value: ''
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-document 
        v-model="value"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="Fail"
        :validateStatus="'success'"
        :hasFeedback="true"
        help="1234 Should be combination of numbers & alphabets"></dap-ui-document>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
