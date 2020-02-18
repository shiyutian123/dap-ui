<!--
 * @Author: your name
 * @Date: 2020-02-11 14:36:56
 * @LastEditTime: 2020-02-18 14:14:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lerna-dap/packages/dap-vue-ui/packages/components/table/dap-ui-table.vue
 -->
<template>
  <div class="dap-ui-table">
    <vxe-table
      :border="typeof(tableBaseConfig.border) === 'undefined' ? true : tableBaseConfig.border"
      stripe
      highlight-hover-row
      :show-overflow="computShowOverflow"
      :show-header-overflow="computShowHeaderOverflow"
      :loading="tableBaseConfig.loading"
      :size="tableBaseConfig.size || 'mini'"
      :height="tableBaseConfig.height"
      :z-index="tableBaseConfig.zIndex"
      :data="computTableData"
      :row-id="tableBaseConfig.rowId"
      :radio-config="tableBaseConfig.radioConfig"
      :checkbox-config="tableBaseConfig.checkboxConfig"
      @radio-change="handleRadioChange"
      @checkbox-change="handleCheckboxChange"
      @select-change="handleCheckboxChange"
      @select-all="handleCheckboxChange"
      @checkbox-all="handleCheckboxChange"
      @sort-change="handleSortChange">
      <!-- <vxe-table-column v-if="tableBaseConfig.selectMode === 'single'" type="radio" align="center" title="" width="40"></vxe-table-column> -->
      <!-- <vxe-table-column v-if="tableBaseConfig.selectMode === 'multipart'" type="checkbox" align="center" width="40"></vxe-table-column> -->
      <!-- <vxe-table-column v-if="!tableBaseConfig.hideSeq" type="seq" align="center" width="45"></vxe-table-column> -->
      <vxe-table-column v-if="!tableBaseConfig.hideSeq" align="center" width="45">
        <template v-slot:header>
          <div class="seq-header">
            <span v-if="tableBaseConfig.selectMode !== 'multipart'">#</span>
            <span v-if="tableBaseConfig.selectMode === 'multipart'" title="全选/取消"
            class="vxe-cell--checkbox"
            :class="{ 'is--checked': checkAll, 'is--indeterminate': indeterminate }"
            @click="onClickCheckAll"></span>
          </div>
        </template>
        <template v-slot="{ row, rowIndex }">
          <div class="seq-cell" :class="{ 'checked': row.$__checked }">
            <span class="seq">{{ rowIndex + 1 }}</span>
            <span class="vxe-cell--checkbox" @click="onCheckRow(row, rowIndex)" :class="{ 'is--checked': row.$__checked }"></span>
          </div>
        </template>
      </vxe-table-column>
      <template v-for="(config, index) in tableBaseConfig.columns">
        <vxe-table-column v-if="!config.slotName" :key="index" v-bind="config"></vxe-table-column>
        <vxe-table-column v-if="config.slotName" :key="index" v-bind="config">
          <template v-slot="{ row,rowIndex }">
            <slot
            :name="config.slotName"
            :row="row"
            :rowIndex="rowIndex">
            </slot>
          </template>
        </vxe-table-column>
      </template>
    </vxe-table>
    <vxe-pager
      v-if="tableBaseConfig.tablePage"
      size="medium"
      :loading="tableBaseConfig.loading"
      :current-page="tableBaseConfig.tablePage.currentPage"
      :page-sizes="tableBaseConfig.tablePage.pageSizes"
      :page-size="tableBaseConfig.tablePage.pageSize"
      :total="tableBaseConfig.tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>
  </div>
</template>

<script>
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

export default {
  name: 'DapUiTable',
  props: {
    tableBaseConfig: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    tableUiConfig: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    tableData: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      checkAll: false,
      indeterminate: false,
      checkedData: []
    };
  },
  computed: {
    computTableData: function () {
      if (this.tableBaseConfig.frontPaging) {
        const start = (this.tableBaseConfig.tablePage.currentPage - 1) * this.tableBaseConfig.tablePage.pageSize;
        const end = start + this.tableBaseConfig.tablePage.pageSize;
        return this.tableData.slice(start, end);
      } else {
        return this.tableData;
      }
    },
    computShowOverflow: function () {
      if (this.tableBaseConfig && this.tableBaseConfig.virtualList) {
        return true;
      }
      return this.tableBaseConfig && this.tableBaseConfig.showOverflow;
    },
    computShowHeaderOverflow: function () {
      if (this.tableBaseConfig && this.tableBaseConfig.virtualList) {
        return true;
      }
      return this.tableBaseConfig && this.tableBaseConfig.showHeaderOverflow;
    }
  },
  watch: {
    tableData: {
      handler (newValue, oldValue) {
        if (this.tableBaseConfig.frontPaging && newValue) {
          this.tableBaseConfig.tablePage.totalResult = newValue.length;
        }
        this.checkedData.map(checkedItem => {
          const tempObj = newValue.filter(item => item[this.tableBaseConfig.rowId] === checkedItem[this.tableBaseConfig.rowId])[0];
          if (tempObj) {
            tempObj.$__checked = true;
          }
        });
        this.$_setHeaderSeqCheckStatus();
      },
      immediate: true
    }
  },
  created() {
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
      if (this.tableBaseConfig.frontPaging) {
        this.tableBaseConfig.tablePage.currentPage = e.currentPage;
        this.tableBaseConfig.tablePage.pageSize = e.pageSize;
      } else {
        this.$emit('page-change', e);
      }
      this.$_setHeaderSeqCheckStatus();
    },
    /**
     * @description: 单选选中事件
     * @param {Object} e - 单选选中时的回调参数
     * @param {Object} e.row - 选中行的数据
     * @return: 
     */
    handleRadioChange(e) {
      // 将单条数据处理成一个元素的数组
      const data = {
        selection: [e.row]
      };
      this.$emit('select-change', data);
    },
    /**
     * @description: 多选选中事件
     * @param {Object} e - 多选选中时的回调参数
     * @param {Object} e.selection - 选中行的数据
     * @return: 
     */
    handleCheckboxChange(e) {
      const data = {
        selection: e.selection
      };
      this.$emit('select-change', data);
    },
    /**
     * @description: 排序改变事件
     * @param {Object} e - 排序改变时的回调参数
     * @return: 
     */
    handleSortChange(e) {
      this.$emit('sort-change', e);
    },
    /**
     * @description: 选中行事件
     * @param {Object} row - 行数据
     * @return: 
     */
    onCheckRow(row, rowIndex) {
      const flag = row.$__checked;
      if (this.tableBaseConfig.selectMode === 'single') {
        this.tableData.map((item, i) => {
          item.$__checked = false;
        });
      }
      row.$__checked = !flag;
      this.tableData = Object.assign([], this.tableData);
      this.$_setHeaderSeqCheckStatus();
      // 将选中数据向上抛
      const data = {
        selection: this.getChekced()
      };
      this.$emit('select-change', data);
      // 组件实例记录选中的数据
      if (this.tableBaseConfig.selectMode === 'multipart') {
        if (row.$__checked) {
          this.$_takeCheckedData([row]);
        } else {
          this.$_takeUncheckedData([row]);
        }
      } else {
        if (row.$__checked) {
          this.checkedData = [JSON.parse(JSON.stringify(row))];
        } else {
          this.checkedData = [];
        }
      }
    },
    onClickCheckAll() {
      this.indeterminate = false;
      this.checkAll = !this.checkAll;
      let tempArr;
      if (this.tableBaseConfig.frontPaging) { // 处理前端分页数据
        const start = (this.tableBaseConfig.tablePage.currentPage - 1) * this.tableBaseConfig.tablePage.pageSize;
        const end = start + this.tableBaseConfig.tablePage.pageSize;
        tempArr = this.tableData.slice(start, end);
        tempArr.map((item) => {
          item.$__checked = this.checkAll;
        });
        this.tableData = Object.assign([], this.tableData);
      } else {
        this.tableData.map((item) => {
          item.$__checked = this.checkAll;
        });
        this.tableData = Object.assign([], this.tableData);
        tempArr = this.tableData;
      }
      // 将选中数据向上抛
      const data = {
        selection: this.getChekced()
      };
      this.$emit('select-change', data);
      // 组件实例记录选中的数据
      if (this.checkAll) {
        this.$_takeCheckedData(tempArr);
      } else {
        this.$_takeUncheckedData(tempArr);
      }
    },
    $_setHeaderSeqCheckStatus() {
      let tempArr;
      if (this.tableBaseConfig.frontPaging) {
        const start = (this.tableBaseConfig.tablePage.currentPage - 1) * this.tableBaseConfig.tablePage.pageSize;
        const end = start + this.tableBaseConfig.tablePage.pageSize;
        tempArr = this.tableData.slice(start, end);
      } else {
        tempArr = this.tableData;
      }
      const checkedLength = tempArr.filter(item => item.$__checked).length;
      if (checkedLength === 0) {
        this.checkAll = false;
        this.indeterminate = false;
      } else if (checkedLength > 0 && checkedLength !== tempArr.length) {
        this.indeterminate = true;
      } else {
        this.checkAll = true;
        this.indeterminate = false;
      }
    },
    getChekced() {
      return this.getCurrentPageChecked();
    },
    getAllChecked() {
      return this.checkedData;
    },
    getCurrentPageChecked() {
      if (this.tableBaseConfig.frontPaging) {
        const start = (this.tableBaseConfig.tablePage.currentPage - 1) * this.tableBaseConfig.tablePage.pageSize;
        const end = start + this.tableBaseConfig.tablePage.pageSize;
        const tempArr = this.tableData.slice(start, end);
        return tempArr.filter(item => item.$__checked);
      } else {
        return this.tableData.filter(item => item.$__checked);
      }
    },
    $_takeCheckedData(checkedArr) {
      checkedArr.map(checkedItem => {
        if (this.checkedData.filter(item => item[this.tableBaseConfig.rowId] === checkedItem[this.tableBaseConfig.rowId]).length === 0) {
          this.checkedData.push(JSON.parse(JSON.stringify(checkedItem)));
        }
      });
    },
    $_takeUncheckedData(uncheckedArr) {
      uncheckedArr.map(uncheckedItem => {
        const tempArr = this.checkedData.filter(item => item[this.tableBaseConfig.rowId] === uncheckedItem[this.tableBaseConfig.rowId]);
        if (tempArr.length > 0) {
          this.checkedData.splice(this.checkedData.indexOf(tempArr[0]), 1);
        }
      });
    }
  }
}
</script>
<style src="./index.less" lang="less"></style>
