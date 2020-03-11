<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-17 08:47:50
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-associate-form-link dap-ui-form-item">
    <span 
        @click="$formEventEmit('click', $event)"
        class="associate-form-link" 
        :style="{color: labelColor}">
        <a-icon type="link" />
        {{label}}</span>
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiAssociateForm",
  type: 'FORM_STATIC_RENDER',
  mixins: [BasicComponentMixin],
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
