<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-27 15:41:27
 * @Description: file content description
 -->
# InputEmail 邮箱输入框

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<input-demo></input-demo>

::: demo

```js
export default {
  name: 'input-demo-email',
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
    <dap-ui-input-email 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-input-email>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
