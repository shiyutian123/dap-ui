<!--
 * @Author: your name
 * @Date: 2020-02-11 14:46:57
 * @LastEditTime: 2020-02-22 21:45:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lerna-dap/packages/dap-vue-ui/examples/demos/table.vue
 -->
<template>
  <div class="demo-block">
    <dap-ui-table
    ref="table"
    :table-base-config="tableBaseConfig"
    :table-data="tableData"
    @page-change="handlePageChange"
    @select-change="handleSelectChange"
    @cell-click="onCellClick">
      <template v-slot:name="{ row, rowIndex, column }">
        <span style="color:blue">{{ row.name }} {{ row.id }} {{ column }}</span>
      </template>
      <template v-slot:seqFooter>
        <span>累计</span>
      </template>
      <template v-slot:footer="{ items, itemIndex }">
        <span>{{ items }}</span>
        <span>{{ itemIndex }}</span>
      </template>
    </dap-ui-table>
    本页已选中的数据：
    {{ checkedData }}
  </div>
</template>

<script>
export default {
  name: 'table-demo',
  data() {
    return {
      checkedData: [],
      tableBaseConfig: {
        loading: false,
        rowId: 'id',
        frontPaging: false,
        hideSeq: false,
        selectMode: 'single',
        checkboxConfig: {
          checkRowKeys: ['1', '2']
        },
        height: 400,
        virtualList: true,
        columns: [
          {
            field: 'name',
            title: '姓名',
            slotName: 'name',
            sortable: true,
            remoteSort: true
          },
          {
            field: 'sex',
            title: '性别',
            sortable: true,
            remoteSort: true
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
        },
        showFooter: true,
        footerMethod: ({ columns, data }) => {
          return [
            columns.map((column, columnIndex) => {
              return 1+1;
            })
          ];
        }
      },
      tableData: []
    };
  },
  computed: {
  },
  created() {
    for (let i = 0; i < 15; i++) {
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
        const data = [];
        for (let i = 0; i < 15; i++) {
          data.push({name: '张三', sex: '男', age: 18, id: `${(e.currentPage - 1) * e.pageSize + i}`});
        }
        this.tableData = data;
        this.tableBaseConfig.loading = false;
        this.tableBaseConfig.tablePage.currentPage = e.currentPage;
        this.tableBaseConfig.tablePage.pageSize = e.pageSize;
        setTimeout(() => {
          this.checkedData = this.$refs.table.getChekced();
        }, 0);
      }, 1000);
    },
    /**
     * @description: 选中改变事件
     * @param {Object} e - 选中改变时的数据
     * @param {Object[]} e.selection - 选中行的数据,注：单选为单个元素的数组
     * @return: 
     */
    handleSelectChange(e) {
      this.checkedData = e.selection;
    },
    onCellClick(e) {
      console.log('------onCellClick-------', e);
    }
  }
}
</script>
