<!--
 * @Author: your name
 * @Date: 2020-02-13 15:02:48
 * @LastEditTime: 2020-02-21 18:32:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/examples/docs/modal.md
 -->
# AvatarCropperModal 头像裁剪弹窗

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<avatar-cropper-modal-demo></avatar-cropper-modal-demo>

::: demo

```html
 <div class="demo-block">
    <label for="uploads" class="uploadImg" id="label">
      <a-icon type="form" class="edit-icon" />
    </label>
    <dap-ui-avatar-cropper-modal
      ref="cropperModal" :cropperId="'uploads'" :baseDomain="baseDomain" @cropperOk="uploadAvatar($event)">
    </dap-ui-avatar-cropper-modal>
  </div>
```

```
<script>
export default {
  name: "modal-demo",
  data() {
    return {
      baseDomain: "http://******"
    };
  },
  methods: {
    /**
     * @description: 确定点击事件
     * @param {MouseEvent} e - 鼠标事件
     * @return: 
     */
    uploadAvatar(e) {
      this.$refs['cropperModal'].setOkBtnNotLoading();
    },
  }
};
</script>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| cropperId  |  input file id    | String   |        |  uploads         | 
| baseDomain    |  环境变量baseDomain       | String   |        |           | 
| showPreviewImg    |  是否展示预览       | Boolean   |        |  true         | 
| isCropperFree    |  裁剪框是否可自由裁剪       | Boolean   |        |  true         | 
| cropperWidth    |  裁剪框宽       | Number   |        |   1        | 
| cropperHeight    |  裁剪框高       | Number   |        |  1         | 
| imgSize    |  图片大小       | Number   |        |  2         | 

## Events

<!-- {.md} -->

| 属性    | 说明        | 类型     | 可选值  |  参数    |
| -------| -----------| -------- | ------ | --------- |
| cropperOk    |  点击确认裁剪回调       |      |        |  `event = {url: avatarSrc,file: file};`         | 



