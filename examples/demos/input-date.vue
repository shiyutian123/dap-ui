<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-27 12:50:10
 * @Description: file content description
 -->
<style lang="less">
</style>
<script>
export default {
  name: 'input-date-demo',
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
        value: '',
        extraProp: {
          showTime: true
        }
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-input-date 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Fail"
      :validateStatus="'error'"
      :hasFeedback="true"
      :extraProp="extraProp"
      :defaultValue="'2020-02-02'"
      help="1234 Should be combination of numbers & alphabets"></dap-ui-input-date>
    {{value}}
  </div>
</template>