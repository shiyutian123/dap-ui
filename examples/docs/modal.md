<!--
 * @Author: your name
 * @Date: 2020-02-13 15:02:48
 * @LastEditTime : 2020-02-15 14:26:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/examples/docs/modal.md
 -->
# Modal 模态框

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<modal-demo></modal-demo>

::: demo

```html
  <div class="demo-block">
    <a-button
    v-for="(btn, index) in btns"
    :key="index"
    type="primary"
    style="margin-right: 1rem;"
    @click="onClickBtn(btn)">
    {{ btn }}
    </a-button>
    <dap-ui-modal
    :title="title"
    :visible="visible"
    :size="size"
    @ok="handleOk"
    @cancel="handleCancel">
      <p>内容...</p>
    </dap-ui-modal>
  </div>
```

```
<script>
export default {
  name: "modal-demo",
  data() {
    return {
      title: "模态框标题",
      visible: false,
      size: undefined,
      btns: ['large', 'medium', 'small']
    };
  },
  methods: {
    /**
     * @description: 确定点击事件
     * @param {MouseEvent} e - 鼠标事件
     * @return: 
     */
    handleOk(e) {
      this.visible = false;
    },
    /**
     * @description: 取消点击事件
     * @param {MouseEvent} e - 鼠标事件
     * @return: 
     */
    handleCancel(e) {
      this.visible = false;
    },
    onClickBtn(size) {
      this.size = size;
      this.visible = true;
    }
  }
};
</script>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| title    |  标题       | String   |        |           | 
| visible    |  对话框是否可见       | Boolean   |        |           | 
| size    |  对话框尺寸       | String   |  `large` `medium` `small`      |  medium         | 
| after-close    |  Modal 完全关闭后的回调       | Function   |        |           | 
| cancel-text    |  取消按钮文字       | String   |        |  取消         | 
| ok-text    |  确定按钮文字       | String   |        |  确定         | 
| z-index    |  设置 Modal 的 `z-index`       | Number   |        |  1000         | 
| mask    |  是否展示遮罩       | Boolean   |        |  true         | 
| mask-closable    |  点击蒙层是否允许关闭       | Boolean   |        |  false         | 
| ok-button-props    |  ok 按钮 props, 遵循 jsx规范       | 	{props: ButtonProps, on: {}}   |        |           | 
| cancel-button-props    |  cancel 按钮 props, 遵循 jsx规范       | 	{props: ButtonProps, on: {}}   |        |           | 
| destroy-on-close    |  关闭时销毁 Modal 里的子元素       | 	Boolean   |        |  false         | 
| content-adaption    |  内容高度自适应，此属性将忽略size属性，请谨慎使用       | 	Boolean   |        |  false         | 

## Events

<!-- {.md} -->

| 属性    | 说明        | 类型     | 可选值  |  参数    |
| -------| -----------| -------- | ------ | --------- |
| cancel    |  点击遮罩层或右上角叉或取消按钮的回调       |      |        |  `{e: MouseEvent}`         | 
| ok    |  点击确定回调	       |      |        |  `{e: MouseEvent}`         | 


## ButtonProps

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| disabled    |  按钮失效状态	       | Boolean   |        |   false     | 
| ghost    |  幽灵属性，使按钮背景透明	       | Boolean   |        |   false     | 
| icon    |  设置按钮的图标类型		       | String   |        |        | 
| loading    |  设置按钮载入状态	       | Boolean | { delay: number }   |        |   false     | 
| shape    |  设置按钮形状，可选值为 circle、 round 或者不设	       | String   |        |        | 
| size    |  设置按钮大小，可选值为 small large 或者不设	       | String   |        |   default     | 
| type    |  设置按钮类型，可选值为 primary dashed danger link 或者不设	       | String   |        |   default     | 
| block    |  将按钮宽度调整为其父宽度的选项		       | Boolean   |        |   false     | 
