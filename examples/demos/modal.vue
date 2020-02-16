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
</template>

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
