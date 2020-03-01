<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 14:43:38
 * @Description: file content description
 -->
<style lang="less">
</style>
<script>
export default {
  name: 'checkbox-demo',
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
        value: ['1'],
        options: [{
            value: '1',
            label: '111',
        }, {
            value: '2',
            label: '222',
        }],
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-checkbox 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="checkbox"
      :hasFeedback="false"
      :options="options"
      :extraProp="extraProp"
      @formEventEmit="formEvent"></dap-ui-checkbox>
    {{value}}
  </div>
</template>