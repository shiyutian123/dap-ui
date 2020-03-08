<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-17 08:47:50
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-web dap-ui-form-item">
    <div style="height: 100%;">
      <iframe title="" :src="extraProp.src" frameborder="0" width="100%" height="100%">
      </iframe>
    </div>
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiWeb",
  type: 'FORM_STATIC_RENDER',
  mixins: [BasicComponentMixin],
  props: {
  },
  // data()  {
  //   return {
  //     srcValue: "http://wwww.baidu.com"
  //   }
  // },
  // watch: {
  //   extraProp: {
  //     handler (newValue, oldValue) {
  //       console.log(newValue);
  //     },
  //     deep: true,
  //     immediate: true,
  //   }
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
