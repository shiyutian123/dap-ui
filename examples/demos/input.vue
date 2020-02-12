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
  name: 'input-demo',
  data: function() {
    return {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
        value: ''
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-input 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-input>
    {{value}}
  </div>
</template>