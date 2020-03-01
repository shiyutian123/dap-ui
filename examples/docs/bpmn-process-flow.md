<!--
 * @Author: your name
 * @Date: 2020-03-01 14:21:11
 * @LastEditTime: 2020-03-01 17:45:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/examples/docs/bpmn-process-flow.md
 -->
# BpmnProcessFlow 流程图

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<bpmn-process-flow-demo></bpmn-process-flow-demo>

::: demo

```html
  <div class="demo-block">
  </div>
```

```
<script>
export default {
  name: 'lov-demo',
  data() {
    return {
      label: '合同',
      placeholder: '请选择合同',
      value: '',
      extraProp: {
        tableData: [],
        totalResult: 0,
        columns: [],
        loading: false,
        modelCode: 'contract_no'
      }
    }
  },
  methods: {
    formEvent($event) {
      if ($event.eventName === 'query-lov-data') {
        this.extraProp.loading = true;
        setTimeout(() => {
          // 查询列信息
          this.$set(this.extraProp, 'columns', [{field: 'contract_no', title: '合同编码'}]);
          // 查询数据
          this.extraProp.tableData = JSON.parse(`[{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":1,"chance_TRANS":"3","contract_no":"HT20200001","amount":900000.0,"chance":"上海得帆-DAP研发项目","payment_clause":"项目验收完成","sign_date":"2020-01-12","contract_name":"上海得帆-DAP研发项目","apply_time":"2020-01-11 13:35:33","customer_manager":["117"],"applier":"117","contract_files":"1578807448156","region":"华东","rowDocumentId":"5e1ab0ca6762f3000101a339","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":2,"chance_TRANS":"5","contract_no":"HT20200002","amount":80000.0,"chance":"上海得帆-Pluto研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-Pluto研发项目","apply_time":"2020-01-12 13:59:25","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ab5fd2bc5d6000147b5c8","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":3,"chance_TRANS":"6","contract_no":"HT20200004","amount":80000.0,"chance":"上海得帆-MP研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-MP研发项目","apply_time":"2020-01-12 14:01:29","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ab6a12bc5d6000147b622","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":5,"chance_TRANS":"7","contract_no":"HT20200005","amount":8500.0,"chance":"上海得帆-门户研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-门户研发项目","apply_time":"2020-01-12 16:12:25","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ad54a8f2de300010f7099","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":6,"chance_TRANS":"7","contract_no":"HT20200006","amount":8500.0,"chance":"上海得帆-门户研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-门户研发项目","apply_time":"2020-01-12 16:33:04","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ad9e38f2de300010f7363","customer":"上海得帆信息技术有限公司"},{"region_TRANS":{"meaning":["east"],"type":"comm_region"},"id":6,"chance_TRANS":"7","contract_no":"HT20200007","amount":8500.0,"chance":"上海得帆-门户研发项目","sign_date":"2020-01-12","contract_name":"上海得帆-门户研发项目","apply_time":"2020-01-12 16:33:04","customer_manager":["117"],"applier":"117","region":"华东","rowDocumentId":"5e1ad9e38f2de300010f7363","customer":"上海得帆信息技术有限公司"}]`);
          this.extraProp.totalResult = 28;
          this.extraProp.loading = false;
        }, 800);
      } else if ($event.eventName === 'lov-ok') {
        this.value = $event.event.selection[0] && $event.event.selection[0][this.extraProp.modelCode];
      }
    }
  }
}
</script>
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| loading    |  流程图是否显示加载中       | Boolean   |        |         | 
| extraProp    |  额外数据       | Object   |        |         | 

## Methods

<!-- {.md} -->

| 属性    | 说明        | 类型     | 可选值  |  参数    |
| -------| -----------| -------- | ------ | --------- |
| loadResources    |  加载资源文件       | Promise    |        |           | 
| importDiagramForJson    |  导入流程图进行显示       |      |        | `{definitions: Object}`         | 
| fillColor    |  渲染颜色       |      |        |         | 
