<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-25 19:13:08
 * @Description: file content description
 -->
<style lang="less">
</style>
<script>
export default {
  name: 'input-money-demo',
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
        value: '13647222759'
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-input-money
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-input-money>
    {{value}}
  </div>
</template>