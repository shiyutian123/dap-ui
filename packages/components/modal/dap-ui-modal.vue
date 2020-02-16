<!--
 * @Author: your name
 * @Date: 2020-02-13 14:50:42
 * @LastEditTime : 2020-02-15 14:24:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/components/modal/dap-ui-modal.vue
 -->
<template>
  <div class="dap-ui-modal">
    <a-modal
    style="top: 1rem;"
    :class="computClassName"
    :title="title"
    :visible="visible"
    :z-index="zIndex"
    :cancel-text="cancelText"
    :ok-text="okText"
    :mask="mask"
    :mask-closable="maskClosable"
    :destroy-on-close="destroyOnClose"
    :ok-button-props="okButtonProps"
    :cancel-button-props="cancelButtonProps"
    @ok="handleOk"
    @cancel="handleCancel">
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "DapUiModal",
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    size: {
      type: String, // 'large' || 'medium' || 'small',
      default: function () {
        return 'medium';
      }
    },
    afterClose: {
      type: Function
    },
    cancelText: {
      type: String,
      default: function () {
        return `取消`;
      }
    },
    okText: {
      type: String,
      default: function () {
        return `确定`;
      }
    },
    zIndex: {
      type: Number,
      default: function () {
        return 1000;
      }
    },
    mask: {
      type: Boolean,
      default: function () {
        return true;
      }
    },
    maskClosable: {
      type: Boolean,
      default: function () {
        return false;
      }
    },
    okButtonProps: {
      type: Object
    },
    cancelButtonProps: {
      type: Object
    },
    destroyOnClose: {
      type: Boolean,
      default: function () {
        return false;
      }
    },
    contentAdaption: {
      type: Boolean,
      default: function () {
        return false;
      }
    }
  },
  computed: {
    computClassName: function () {
      return `dap-ui-modal ${this.contentAdaption ? 'content-adaption' : ''} ${this.size}`;
    }
  },
  methods: {
    /**
     * @description: 确定点击事件
     * @param {MouseEvent} e - 鼠标事件
     * @return: 
     */
    handleOk(e) {
      this.$emit('ok', e);
    },
    /**
     * @description: 取消点击事件
     * @param {MouseEvent} e - 鼠标事件
     * @return: 
     */
    handleCancel(e) {
      this.$emit('cancel', e);
    }
  }
};
</script>

<style src="./index.less" lang="less"></style>
