<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-23 18:24:31
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
        required: true
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
      },{
        label: '被保险人清单',
        uuid: '196be4f4-728b-45af-8f10-a02c82110413',
        dataCode: 'rule_apple.list',
        componentName: 'dap-ui-table-extend',
        rowSpan: 4,
        colSpan: 2,
        visiable: true,
        extraProp: {
          columns: JSON.parse(`[{"field":"insurer_list.account","title":"被保险人账号", "required": true},{"field":"insurer_list.name","title":"被保险人姓名"},{"field":"insurer_list.email","title":"被保险人邮箱"},{"field":"insurer_list.birth","title":"出生日期"},{"field":"insurer_list.start_date","title":"保险开始日期"},{"field":"insurer_list.end_date","title":"保险结束日期"}]`)
        }
      },{
        label: '合同',
        uuid: '9e2e9299-d99c-4d62-b20b-ac9f040018e9',
        dataCode: 'skya_project.contract',
        componentName: 'dap-ui-lov',
        placeholder: '请选择合同',
        rowSpan: 2,
        colSpan: 1,
        required: true,
        visiable: true,
        extraProp: {
          tableData: [],
          totalResult: 0,
          columns: [],
          loading: false,
          extraCode: 'contract_no'
        }
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
    },
    formEvent($event) {
      const config = this.formConfig.filter(item => item.uuid === $event.uuid)[0];
      if ($event.eventName ==='dropdownVisibleChange' && $event.event === true) {
      }
      if ($event.eventName === 'query-lov-data') {
        config.extraProp.loading = true;
        setTimeout(() => {
          // 查询列信息
          this.$set(config.extraProp, 'columns', [{field: 'contract_no', title: '合同编码'}]);
          // 查询数据
          config.extraProp.tableData = JSON.parse(`[{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":1,"chance_TRANS":"3","contract_no":"HT20200001","amount":900000.0,"chance":"上海得帆-DAP研发项目","payment_clause":"项目验收完成","sign_date":"2020-01-12","contract_name":"上海得帆-DAP研发项目","apply_time":"2020-01-11 13:35:33","customer_manager":["117"],"applier":"117","contract_files":"1578807448156","region":"华东","rowDocumentId":"5e1ab0ca6762f3000101a339","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":2,"chance_TRANS":"5","contract_no":"HT20200002","amount":80000.0,"chance":"上海得帆-Pluto研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-Pluto研发项目","apply_time":"2020-01-12 13:59:25","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ab5fd2bc5d6000147b5c8","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":3,"chance_TRANS":"6","contract_no":"HT20200004","amount":80000.0,"chance":"上海得帆-MP研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-MP研发项目","apply_time":"2020-01-12 14:01:29","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ab6a12bc5d6000147b622","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":5,"chance_TRANS":"7","contract_no":"HT20200005","amount":8500.0,"chance":"上海得帆-门户研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-门户研发项目","apply_time":"2020-01-12 16:12:25","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ad54a8f2de300010f7099","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":6,"chance_TRANS":"7","contract_no":"HT20200006","amount":8500.0,"chance":"上海得帆-门户研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-门户研发项目","apply_time":"2020-01-12 16:33:04","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ad9e38f2de300010f7363","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":6,"chance_TRANS":"7","contract_no":"HT20200007","amount":8500.0,"chance":"上海得帆-门户研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-门户研发项目","apply_time":"2020-01-12 16:33:04","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ad9e38f2de300010f7363","customer":"上海得帆信息技术有限公司"}]`);
          config.extraProp.totalResult = 28;
          config.extraProp.loading = false;
        }, 800);
      }
      if ($event.eventName === 'lov-ok') {
        const checkecData = $event.event.selection[0] && $event.event.selection[0];
        if (checkecData) {
          this.$set(this.formData, config.dataCode, checkecData[config.extraProp.extraCode]);
          this.$set(this.formData, `${config.dataCode}_TRANS`, checkecData._id || checkecData.ID || checkecData.id);
        }
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