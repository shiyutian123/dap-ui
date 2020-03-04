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
  name: 'switch-demo',
  data: function() {
    return {
        value: ''
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-switch 
      v-model="value"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-switch>
    {{value}}
  </div>
</template>