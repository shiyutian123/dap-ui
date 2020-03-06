<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-17 08:47:50
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-static-picture dap-ui-form-item">
    <div class="picture">
      <img class="pictureImg" :src="extraProp.src" alt="">
    </div>
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiStaticPicture",
  type: 'FORM_STATIC_RENDER',
  mixins: [BasicComponentMixin],
  props: {
  },
  computed: {
    // 计算属性的 getter
    itemClass: function () {
        // `this` 指向 vm 实例
        return `pictureImg-y${this.colSpan}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less" scoped>
</style>
