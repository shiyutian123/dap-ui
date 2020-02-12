<!--
 * @Author: your name
 * @Date: 2020-02-11 14:46:57
 * @LastEditTime : 2020-02-12 17:07:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lerna-dap/packages/dap-vue-ui/examples/demos/table.vue
 -->
<template>
  <div class="demo-block">
    <dap-ui-table
    :table-base-config="tableBaseConfig"
    :table-data="tableData"
    @page-change="handlePageChange"
    @select-change="handleSelectChange">
      <template v-slot:name="{ row, rowIndex }">
        <span style="color:blue">{{ row.name }} {{ row.id }}</span>
      </template>
    </dap-ui-table>
  </div>
</template>

<script>
export default {
  name: 'table-demo',
  data() {
    return {
      tableBaseConfig: {
        loading: false,
        rowId: 'id',
        frontPaging: true,
        selectMode: 'multipart',
        checkboxConfig: {
          checkRowKeys: ['1', '2']
        },
        height: 400,
        virtualList: true,
        columns: [
          {
            field: 'name',
            title: '姓名',
            slotName: 'name'
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
        this.tableBaseConfig.tablePage.pageSize = e.pageSize;
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
