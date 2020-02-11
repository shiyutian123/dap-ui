# Table 基础表格

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<table-demo></table-demo>

::: demo

```html
  <div class="demo-block">
    <sdf-ui-table
    :table-base-config="tableBaseConfig"
    :table-data="tableData"
    @page-change="handlePageChange"
    @select-change="handleSelectChange">
    </sdf-ui-table>
  </div>
```

```
<script>
export default {
  name: 'table-demo',
  data() {
    return {
      tableBaseConfig: {
        loading: false,
        rowId: 'id',
        selectMode: 'multipart',
        checkboxConfig: {
          checkRowKeys: ['1', '2']
        },
        height: 400,
        virtualList: true,
        columns: [
          {
            field: 'name',
            title: '姓名'
          },
          {
            field: 'sex',
            title: '性别'
          },
          {
            field: 'age',
            title: '年龄'
          }
        ],
        tablePage: {
          currentPage: 1,
          pageSize: 15,
          totalResult: 100
        }
      },
      tableData: []
    };
  },
  created() {
    for (let i = 0; i < 1000; i++) {
      this.tableData.push({name: '张三', sex: '男', age: 18, id: `${i}`});
    }
  },
  methods: {
    /**
     * @description: 分页器改变事件
     * @param {Object} e - 分页器改变时的回调参数
     * @param {String} e.type - 类型
     * @param {String} e.pageSize - 当前每页条数
     * @param {String} e.currentPage - 点击的当前页
     * @return: 
     */
    handlePageChange(e) {
      // load data...
      this.tableBaseConfig.loading = true;
      setTimeout(() => {
        this.tableBaseConfig.loading = false;
        this.tableBaseConfig.tablePage.currentPage = e.currentPage;
      }, 1000);
    },
    /**
     * @description: 选中改变事件
     * @param {Object} e - 选中改变时的数据
     * @param {Object[]} e.selection - 选中行的数据,注：单选为单个元素的数组
     * @return: 
     */
    handleSelectChange(e) {
      window.console.log(e);
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
| table-base-config    |  表格基础配置       | TableBaseConfig   |        |           | 
| table-ui-config    |  表格UI配置       | TableUIConfig   |        |           | 
| table-data    |  表格数据       | Array\<any\>   |        |  \[\]         | 

## Events

<!-- {.md} -->

| 属性    | 说明        | 类型     | 可选值  |  参数    |
| -------| -----------| -------- | ------ | --------- |
| page-change    |  当分页器改变的时候触发的事件       |    |        |  `{type: String, currentPage: Number, pageSize: Number}`         | 
| select-change    |  当选中改变的时候触发的事件       |    |        |  `{selection: Array}`         | 

## TableBaseConfig

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| columns    |  列       | Array\<Column\>   |        |    \[\]     | 
| rowId    |  自定义主键名称       |  String   |        |         | 
| height    |  表格的高度；支持铺满父容器或者固定宽高，如果设置 auto 为铺满父容器（如果设置自适应时，必须确保存在父节点且不允许存在相邻元素）       |  Number, String   |  auto, %, px      |         | 
| tablePage    |  分页器，如果为undefined或者false则不渲染       | TablePage   |        |         | 
| hideSeq    |  隐藏序列       | Boolean   |        |    false     | 
| loading    |  表格是否显示加载中（若是table-base-config中初始化的时候没有这个属性，则之后再使用loading不起作用）       | Boolean   |        |         | 
| size    |  表格的尺寸       | String   |  `medium` `small` `mini`      |  medium       | 
| zIndex    |  自定义堆叠顺序（对于某些特殊场景，比如被遮挡时可能会用到）       | Number   |  `medium` `small` `mini`      |         | 
| showOverflow    |  设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）       | Boolean, String   |  `ellipsis（只显示省略号）` `title（并且显示为原生 title）` `tooltip（并且显示为 tooltip 提示）`      |         | 
| showHeaderOverflow    |  设置表头所有内容过长时显示为省略号       | Boolean, String   |  `ellipsis（只显示省略号）` `title（并且显示为原生 title）` `tooltip（并且显示为 tooltip 提示）`      |         | 
| virtualList    |  是否开启虚拟滚动       | Boolean   |        |  false       | 
| selectMode    |  选中模式       | String   |  `single` `multipart`      |         | 
| radioConfig    |  单选框配置项       | RadioConfig   |        |         | 
| checkboxConfig    |  复选框配置项       | CheckboxConfig   |        |         | 



## Column

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| type    |  字段显示的组件类型       |  String   | `seq` `checkbox` `radio` `expand` `html`       |        | 
| field    |  列字段名（注：属性层级越深，渲染性能将直线下降）       | String   |        |        | 
| title    |  列标题       | String   |        |        | 
| width    |  列宽度（如果为空则自适应，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 "%" 或者 "min-width" 布局）       | Number, String   |  auto, px, %      |        | 
| minWidth    |  最小列宽度；会自动将剩余空间按比例分配       | Number, String   |  px, %      |        | 
| resizable    |  列是否允许拖动列宽调整大小       | Boolean   |        |        | 
| visible    |  列是否显示       | Boolean   |        |        | 
| fixed    |  将列固定在左侧或者右侧（注意：固定列应该放在左右两侧的位置）       | String   |  `left` `right`      |        | 
| align    |  列对齐方式       | String   |  `left` `center`  `right`      |        | 
| showOverflow    |  当内容过长时显示为省略号       | String,Boolean   |  `ellipsis（只显示省略号）` `title（并且显示为原生 title）` `tooltip（并且显示为 tooltip 提示）`      |        | 
| className    |  给单元格附加 className，也可以是函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})       | String, Function   |        |        | 
| headerClassName    |  给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})       | String, Function   |        |        | 
| formatter    |  格式化显示内容 Function({cellValue, row, column})       | Function, Array, String |        |        | 
| indexMethod    |  只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex})      | Function |        |        | 
| sortable    |  是否允许列排序      | Boolean |        |   false     | 
| remoteSort    |  是否使用服务端排序，如果设置为 true 则不会对数据进行处理      | Boolean |        |        | 

## TablePage

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| currentPage    |  当前页       |  Number   |        |        | 
| pageSize    |  每页显示多少条       |  Number   |        |        | 
| total    |  总共的条数       |  Number   |        |        | 

## RadioConfig

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| labelField    |  单选框显示的字段名，可以直接显示在单选框中       |  String   |        |        | 
| checkRowKey    |  默认选中开指定行（只会在初始化时被触发一次，需要有 row-id）       |  Row.rowId   |        |        | 
| checkMethod    |  是否允许选中的方法，该方法 Function({row}) 的返回值用来决定这一行的 Radio 是否可以选中      |  Function   |        |        | 
| trigger    |  触发方式      |  String   |  `default（默认）` `cell（点击单元格触发）` `row（点击行触发）`      |        | 
| highlight    |  高亮选中行      |  Boolean   |        |  false      | 


## CheckboxConfig

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值  |  默认值    |
| -------| -----------| -------- | ------ | --------- |
| reserve    |  是否保留勾选状态，对于某些场景下非常有用，比如分页之后还保留之前选中的状态（需要有 row-id）       |  Boolean   |        |  false      | 
| labelField    |  复选框显示的字段名，可以直接显示在复选框中       |  String   |        |        | 
| checkField    |  绑定选中属性，如果设置了该属性渲染速度更快（建议数据量大时使用，行数据中必须存在该字段，否则无效）       |  String   |        |        | 
| showHeader    |  是否显示全选按钮（如果 checkStrictly=true 则默认为 false）       |  Boolean   |        |  true      | 
| checkAll    |  默认勾选所有（只会在初始化时被触发一次）       |  Boolean   |        |  false      | 
| checkRowKeys    |  默认勾选开指定行（只会在初始化时被触发一次，需要有 row-id）       |  Array\<Row.rowId\>   |        |        | 
| checkStrictly    |  是否严格的遵循父子不互相关联的做法       |  Boolean   |        |  false      | 
| strict    |  严格模式，当数据为空或全部禁用时，列表为禁用状态       |  Boolean   |        |  false      | 
| checkMethod    |  是否允许勾选的方法，该方法 Function({row}) 的返回值用来决定这一行的 checkbox 是否可以勾选       |  Function   |        |        | 
| trigger    |  触发方式       |  String   |  `default（默认）` `cell（点击单元格触发）` `row（点击行触发）`      |        | 
| highlight    |  高亮勾选行       |  Boolean   |       |  false      | 
| range    |  开启复选框范围勾选功能（启用后通过鼠标在复选框的列圈选指定行）       |  Boolean   |       |  false      | 

## TableUIConfig

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | --------- |
