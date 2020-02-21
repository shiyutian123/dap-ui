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
  name: 'select-demo',
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
        value: '111',
        options: [{
            value: '1',
            label: '111',
            order: 1
        }, {
            value: '2',
            label: '222',
            order: 2
        }],
        extraProp: {
          loading: false
        }
    }
  },
  methods: {
    formEvent($event) {
      if ($event.eventName ==='dropdownVisibleChange' && $event.event === true) {
        this.extraProp.loading = true;
        setTimeout(() => {
          this.extraProp.loading = false ;
          this.options = [{
              value: '3',
              label: '333',
              order: 1
          }, {
              value: '4',
              label: '444',
              order: 2
          }]
        }, 800);
      }
    }
  }
}
</script>
<template>
  <div class="demo-block">
    <dap-ui-select 
      v-model="value"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label="Select"
      :hasFeedback="false"
      :options="options"
      :extraProp="extraProp"
      @formEventEmit="formEvent"></dap-ui-select>
    {{value}}
  </div>
</template>