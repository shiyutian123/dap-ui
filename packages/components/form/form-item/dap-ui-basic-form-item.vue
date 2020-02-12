<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:27:34
 * @Description: file content description
 -->
<template>
    <div 
        :aria-code="code" 
        v-if="visiable" 
        :aria-uuid="uuid"
        class="dap-ui-basic-form-item"
        :class="itemClass">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: "DapUiBasicFormItem",
  props: {
    'rowSpan': {
        type: Number,
        default: 2
    },
    'colSpan': {
        type: Number,
        default: 1
    },
    'uuid': {
        type: String
    },
    'visiable': {
        type: Boolean,
        default: true
    },
    'code': {
        type: String,
        default: ''
    }
  },
  computed: {
    // 计算属性的 getter
    itemClass: function () {
        // `this` 指向 vm 实例
        return [`dap-ui-form-item-x${this.rowSpan}`, `dap-ui-form-item-y${this.colSpan}`]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
