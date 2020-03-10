<!--
 * @Author: your name
 * @Date: 2020-02-13 15:02:37
 * @LastEditTime : 2020-02-15 14:24:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/examples/demos/modal.vue
 -->
<template>
  <div class="demo-block">
    <label for="uploads" class="uploadImg" id="label">
      <a-icon type="form" class="edit-icon" />
    </label>
    <dap-ui-avatar-cropper-modal
      ref="cropperModal" :cropperId="'uploads'" :baseDomain="baseDomain" @cropperOk="uploadAvatar($event)">
    </dap-ui-avatar-cropper-modal>
  </div>
</template>

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
