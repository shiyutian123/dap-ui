<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 14:59:24
 * @Description: file content description
 -->
# Input 基础输入框

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<select-demo></select-demo>

::: demo

```js
export default {
  name: 'select-demo',
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
        value: '111',
        options: [{
            value: '1',
            label: '111',
            order: 1
        }, {
            value: '2',
            label: '222',
            order: 2
        }],
        extraProp: {
          loading: false
        }
    }
  },
  methods: {
    formEvent($event) {
      if ($event.event) {
        this.extraProp.loading = true;
        setTimeout(() => {
          this.extraProp.loading = false ;
          this.options = [{
              value: '3',
              label: '333',
              order: 1
          }, {
              value: '4',
              label: '444',
              order: 2
          }]
        }, 800);
      }
    }
  }
}
```
```html
<div class="demo-block">
    <dap-ui-select 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Select"
      :hasFeedback="false"
      :options="options"
      :extraProp="extraProp"
      @formEventEmit="formEvent"></dap-ui-select>
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
