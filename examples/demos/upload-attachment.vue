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
  name: 'upload-attachment',
  data: function() {
    return {
        value: '111',
        fileCodeList: [],
        documentId: "123456566"
    }
  },
  methods: {
    customRequest() {},
    remove() {},
    formEvent() {},
    formValueChange() {},
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-upload-attachment 
      :value="value"
      label="uploadPicture"
      :customRequest="customRequest"
      :remove="remove"
      :fileCodeList="fileCodeList"
      :documentId="documentId"
      @formEventEmit="formEvent"
      @chang="formValueChange"></dap-ui-upload-attachment >
  </div>
</template>