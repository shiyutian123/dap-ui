<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:33:01
 * @Description: file content description
 -->
# Editor 富文本组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<editor-demo></editor-demo>

::: demo

```js
export default {
  name: 'editor-demo',
  data: function() {
    return {
        documentId : "",
        value: ''
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-editor 
        v-model="value"
        :documentId="documentId"
        label="Fail"
        :validateStatus="'success'"
        :hasFeedback="true"
        help="1234 Should be combination of numbers & alphabets"></dap-ui-editor>
    {{value}}
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
