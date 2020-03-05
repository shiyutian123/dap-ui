<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 13:16:34
 * @Description: file content description
 -->
<style lang="less">
</style>
<script>
export default {
  name: 'static-picture-demo',
  data: function() {
    return {
        extraProp: {
          src: "http://www.baidu.com"
        }
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-static-picture
      :extraProp="extraProp"
      ></dap-ui-static-picture>
  </div>
</template>