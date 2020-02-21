<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 14:13:50
 * @Description: file content description
 -->
<style lang="less"></style>
<script>
export default {
  name: 'basic-form-demo',
  data: function() {
    return {
      formConfig: [{
        label: '苹果名称1',
        placeholder: '请输入苹果名称',
        type: 'string',
        uuid: '54d0d1c7-8465-4600-82b1-1d327d97c427',
        dataCode: 'rule_apple.apple_name',
        componentName: 'dap-ui-input',
        rowSpan: 2,
        colSpan: 1,
        labelColor: '#eee',
        visiable: true,
        disabled: true,
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
        labelColor: '#000',
        visiable: true,
      },{
        label: '苹果类型描述',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d62',
        componentName: 'dap-ui-select',
        rowSpan: 4,
        colSpan: 1,
        labelColor: '#666',
        visiable: true,
      }, {
        label: '苹果价格',
        uuid: 'c29c65b8-b715-4fec-82e1-de1d4aef1160',
        componentName: 'dap-ui-collapse-layout',
        rowSpan: 4,
        colSpan: 2,
        visiable: true,
        children: [{
          label: '默认标签页',
          visiable: true,
          labelColor: '#000',
          children: [{
            label: '苹果价格',
            placeholder: '请输入苹果价格',
            type: 'string',
            uuid: '4c9ec8b9-c007-4120-97dd-902d5cb29379',
            dataCode: 'rule_apple.apple_price',
            componentName: 'dap-ui-input',
            rowSpan: 2,
            colSpan: 1,
            labelColor: '#000',
            visiable: true,
            required: true,
          }]
        }]
      }, {
        label: '这是一个静态文本提示',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d61',
        componentName: 'dap-ui-static-text',
        rowSpan: 4,
        colSpan: 1,
        labelColor: '#666',
        visiable: true,
      },],
      formData: {
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.formData = {
        'rule_apple.apple_name': '苹果'
      }
    }, 1500)
  },
  methods: {
    reset() {
      this.$refs.basicFormDemo.resetForm();
    },
    formEvent($event) {
      if ($event.eventName ==='dropdownVisibleChange' && $event.event === true) {
        // this.extraProp.loading = true;
        // setTimeout(() => {
        //   this.extraProp.loading = false ;
        //   this.options = [{
        //       value: '3',
        //       label: '333',
        //       order: 1
        //   }, {
        //       value: '4',
        //       label: '444',
        //       order: 2
        //   }]
        // }, 800);
        console.log($event);
      }
    }
  }
}
</script>

<template>
  <div class="demo-block">
    <a-button @click="reset()">重置</a-button> 
    <a-button style="margin-left: 16px" type="primary" @click="$refs.basicFormDemo.validateTouch()">验证表单</a-button>
    <!-- @formEventEmit="" -->
    <dap-ui-basic-form @formEventEmit="formEvent" ref="basicFormDemo" :formConfig="formConfig" v-model="formData"></dap-ui-basic-form> 
  </div>
</template>