<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-12 01:23:19
 * @Description: file content description
 -->
<style lang="less"></style>
<script>
export default {
  name: 'basic-form-demo',
  data: function() {
    return {
      formConfig: [{
        label: '苹果名称',
        placeholder: '请输入苹果名称',
        type: 'string',
        uuid: '54d0d1c7-8465-4600-82b1-1d327d97c427',
        dataCode: 'rule_apple.apple_name',
        componentName: 'dap-ui-input',
        rowSpan: 2,
        colSpan: 1,
        fontColor: '#000'
      }, {
        label: '苹果类型',
        placeholder: '请输入苹果类型',
        type: 'string',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d6f',
        dataCode: 'rule_apple.app_type',
        componentName: 'dap-ui-input',
        rowSpan: 2,
        colSpan: 1,
        required: true,
        fontColor: '#000'
      }],
      formData: {}
    }
  }
}
</script>

<template>
  <div class="demo-block">
    <dap-ui-basic-form :formConfig="formConfig" v-mode="formData"></dap-ui-basic-form> 
  </div>
</template>