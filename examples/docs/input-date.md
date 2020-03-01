<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-27 14:30:55
 * @Description: file content description
 -->
# InputDate 日期输入组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<input-date-demo></input-date-demo>

::: demo

```js
export default {
  name: 'input-date-demo',
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
        value: '',
        extraProp: {
          showTime: true
        }
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-input-date 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      :extraProp="extraProp"
      :defaultValue="'2020-02-02'"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-input-date>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
