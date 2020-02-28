<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-23 13:31:24
 * @Description: file content description
 -->
# Input 基础输入框

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<input-tel-demo></input-tel-demo>

::: demo

```js
export default {
  name: 'input-demo',
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
    <dap-ui-input 
        v-model="value"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="Fail"
        :validateStatus="'success'"
        :hasFeedback="true"
        help="1234 Should be combination of numbers & alphabets"></dap-ui-input>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->