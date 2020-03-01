<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:33:01
 * @Description: file content description
 -->
# UploadPicture 上传图片组件

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<upload-picture-demo></upload-picture-demo>

::: demo

```js
export default {
  name: 'upload-picture',
  data: function() {
    return {
        value: '111',
        fileCodeList: [],
        documentId: "123456566"
    }
  },
  methods: {
    customRequest() {},
    remove() {},
    formEvent() {},
    formValueChange() {},
  }
}
```
```html
<div class="demo-block">
    <dap-ui-upload-picture 
      :value="value"
      label="uploadPicture"
      :customRequest="customRequest"
      :remove="remove"
      :fileCodeList="fileCodeList"
      :documentId="documentId"
      @formEventEmit="formEvent"
      @chang="formValueChange"></dap-ui-upload-picture >
</div>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | -------- |
| msg    |  描述       | String   |        |          | 
