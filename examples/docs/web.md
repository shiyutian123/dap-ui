<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:33:01
 * @Description: file content description
 -->
# Web 网页组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<web-demo></web-demo>

::: demo

```js
export default {
  name: 'web-demo',
  data: function() {
    return {
        extraProp = {
            src: "http://www.baidu.com"
        }
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-web 
       :extraProp="extraProp"></dap-ui-web>
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
