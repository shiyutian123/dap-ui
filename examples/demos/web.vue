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
  name: 'web-demo',
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
  <div class="web-block">
    <dap-ui-web 
      :extraProp="extraProp"
      ></dap-ui-web>
  </div>
</template>