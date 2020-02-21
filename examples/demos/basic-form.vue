<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-20 18:08:59
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
        labelColor: '#eee',
        visiable: true,
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
      }, {
        label: '苹果类型描述',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d61',
        componentName: 'dap-ui-static-text',
        rowSpan: 4,
        colSpan: 1,
        labelColor: '#666',
        visiable: true,
      }, {
        label: '苹果类型描述',
        uuid: '53f14f71-8100-4d66-b89f-b30168c26d61',
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
        label: '被保险人清单',
        uuid: '196be4f4-728b-45af-8f10-a02c82110413',
        dataCode: 'rule_apple.list',
        componentName: 'dap-ui-table-extend',
        rowSpan: 4,
        colSpan: 2,
        visiable: true,
        columnSet: JSON.parse(`[{"formControlName":"insurer_list.account","title":"被保险人账号", "required": true},{"formControlName":"insurer_list.name","title":"被保险人姓名"},{"formControlName":"insurer_list.email","title":"被保险人邮箱"},{"formControlName":"insurer_list.birth","title":"出生日期"},{"formControlName":"insurer_list.start_date","title":"保险开始日期"},{"formControlName":"insurer_list.end_date","title":"保险结束日期"}]`)
      }],
      formData: {
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.formData = {
        // 'rule_apple.app_type': '山东',
        'rule_apple.list': JSON.parse(
          '[{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"},{"insurer_list.account_detail":[{"id":"5d75c1a9b119820db41c090c","empId":"097","name":"翁秋娟","email":"qiujuan.weng@definesys.com","icon":"http://k8s.definesys.com:30529/process/form/downAttachment/1576636536867","firstLetter":"w"}],"insurer_list.password":"9999","insurer_list.email":"534","insurer_list.start_date":"2020-01-13","insurer_list.end_date":"2020-01-13","insurer_list.dept_detail":[{"id":"5df2f34ef0618600010c37a2","name":"流程部","code":"dept5","parentStructure":{"parentCode":"jiaofu2","parentName":"交付2","nextParentCode":"general","parentStructure":{"parentCode":"general","parentName":"总部"}},"parentOrgPath":"总部·交付2"}],"insurer_list.id":20,"insurer_list.dept":["dept5"],"insurer_list.name":"786","insurer_list.account":["097"],"insurer_list.destination_country":"000","insurer_list.birth":"2020-01-13"}]'
        )
      }
    }, 1500)
  },
  methods: {
    reset() {
      this.$refs.basicFormDemo.resetForm();
      this.formData = {
        // 'rule_apple.app_type': '山东'
      }
    }
  }
}
</script>

<template>
  <div class="demo-block">
    <a-button @click="reset()">重置</a-button> 
    <a-button style="margin-left: 16px" type="primary" @click="$refs.basicFormDemo.validateTouch()">验证表单</a-button>
    <dap-ui-basic-form ref="basicFormDemo" :formConfig="formConfig" v-model="formData"></dap-ui-basic-form> 
  </div>
</template>