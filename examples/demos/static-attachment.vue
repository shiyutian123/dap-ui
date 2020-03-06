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
  name: 'static-attachment-demo',
  data: function() {
    return {
        extraProp: {
          fileArray: []
        }
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-static-attachment
      :extraProp="extraProp"
      ></dap-ui-static-attachment>
  </div>
</template>