<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:33:01
 * @Description: file content description
 -->
# StaticAttachment 模板文件组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<static-attachment-demo></static-attachment-demo>

::: demo

```js
export default {
  name: 'static-attachment-demo',
  data: function() {
    return {
        extraProp = {
            fileArray: []
        }
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-static-attachment 
       :extraProp="extraProp"></dap-ui-static-attachment>
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
