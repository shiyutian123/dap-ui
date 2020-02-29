<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-25 16:42:54
 * @Description: file content description
 -->
# Textarea 文本域

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<input-textarea-demo></input-textarea-demo>

::: demo

```js
export default {
  name: 'input-textarea-demo',
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
        value: '123456'
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-input-textarea 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      help="1234 Should be combination of numbers & alphabets"
     ></dap-ui-input-textarea>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->