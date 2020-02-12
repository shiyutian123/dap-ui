<!--
 * @Author: your name
 * @Date: 2020-02-11 14:36:56
 * @LastEditTime : 2020-02-12 21:00:26
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lerna-dap/packages/dap-vue-ui/packages/components/table/dap-ui-table.vue
 -->
<template>
  <div class="dap-ui-table">
    <vxe-table
      stripe
      highlight-hover-row
      :show-overflow="computShowOverflow"
      :show-header-overflow="computShowHeaderOverflow"
      :loading="tableBaseConfig.loading"
      :size="tableBaseConfig.size || 'medium'"
      :height="tableBaseConfig.height"
      :z-index="tableBaseConfig.zIndex"
      :data="computTableData"
      :row-id="tableBaseConfig.rowId"
      :radio-config="computRadioConfig"
      :checkbox-config="computCheckboxConfig"
      @radio-change="handleRadioChange"
      @checkbox-change="handleCheckboxChange"
      @select-change="handleCheckboxChange">
      <vxe-table-column v-if="tableBaseConfig.selectMode === 'single'" type="radio" title="" width="60"></vxe-table-column>
      <vxe-table-column v-if="tableBaseConfig.selectMode === 'multipart'" type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column v-if="!tableBaseConfig.hideSeq" type="seq" width="60"></vxe-table-column>
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
      border
      size="medium"
      :loading="tableBaseConfig.loading"
      :current-page="tableBaseConfig.tablePage.currentPage"
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
      type: Object,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
    }
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
    computRadioConfig: function() {
      if (
        this.tableBaseConfig &&
        this.tableBaseConfig.selectMode === 'single') {
        let temp = this.tableBaseConfig && this.tableBaseConfig.radioConfig;
        if (temp) {
          temp.trigger = 'row';
        } else {
          temp = {trigger: 'row'};
        }
        return temp;
      }
      return this.tableBaseConfig && this.tableBaseConfig.radioConfig;
    },
    computCheckboxConfig: function () {
      if (
        this.tableBaseConfig &&
        this.tableBaseConfig.selectMode === 'multipart') {
        let temp = this.tableBaseConfig && this.tableBaseConfig.checkboxConfig;
        if (temp) {
          temp.trigger = 'row';
        } else {
          temp = { trigger: 'row' };
        }
        return temp;
      }
      return this.tableBaseConfig && this.tableBaseConfig.checkboxConfig;
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
    }
  }
}
</script>
