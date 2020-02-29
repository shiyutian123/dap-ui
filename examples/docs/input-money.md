<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-26 14:29:29
 * @Description: file content description
 -->
# InputMoney 金额输入框

<!-- {.md} -->

value传Number类型，保存时候不需要转换，直接取值即可

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<input-money-demo></input-money-demo>

::: demo

```js
export default {
  name: 'input-money-demo',
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
        value: '13647222759'
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-input-money
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-input-money>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->