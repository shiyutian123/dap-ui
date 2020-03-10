<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-17 08:47:50
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-static-placeholder dap-ui-form-item">
    
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiStaticPlaceholder",
  type: 'FORM_STATIC_RENDER',
  mixins: [BasicComponentMixin],
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
