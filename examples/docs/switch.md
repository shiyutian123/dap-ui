<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:33:01
 * @Description: file content description
 -->
# Switch 开关组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<switch-demo></switch-demo>

::: demo

```js
export default {
  name: 'switch-demo',
  data: function() {
    return {
        value: ''
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-switch 
        v-model="value"
        label="Fail"
        :validateStatus="'success'"
        :hasFeedback="true"
        help="1234 Should be combination of numbers & alphabets"></dap-ui-switch>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
