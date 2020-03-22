<!--
 * @Author: Trevor
 * @Email: wei.tang@definesys.com
 * @Date: 2020-03-19 17:56:48
 * @LastEditTime: 2020-03-19 19:26:22
 * @LastEditors: your name
 * @Description: file content
 -->
<template>
  <dap-ui-modal v-bind="modalConfig" @ok="handleOk" @cancel="handleCancel">
    <div class="lov-choose-block">
      <a-input-search :placeholder="placeholder" @search="onSearch">
        <a-button type="primary" slot="enterButton">
          <a-icon type="search" />
        </a-button>
      </a-input-search>
      <dap-ui-table
        ref="dapUiTable"
        :table-base-config="lovTableBaseConfig"
        :table-data.sync="extraProp.tableData"
        @page-change="handlePageChange"
        @select-change="handleSelectChange"
      ></dap-ui-table>
    </div>
    <div class="selected-block" v-if="extraProp.selectMode === 'multipart'">
      <a-card :title="'共选：' + checkedData.length">
        <div class="tags">
          <a-tag
            v-for="(item, index) in checkedData"
            :visible="true"
            :closable="!disabled"
            :key="index"
            @close="handlerCloseSelectedTag(item, index)"
          >{{ item[extraProp.dataCode] }}</a-tag>
        </div>
      </a-card>
    </div>
  </dap-ui-modal>
</template>

<script>
import InputComponentMixin from '../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../mixins/basic-component-mixin.js';

export default {
  name: 'lov',
  mixins: [BasicComponentMixin, InputComponentMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalConfig: {
        visible: false,
        title: '数据选择',
        size: 'medium',
        modalClass: 'dap-ui-lov-modal'
      },
      lovTableBaseConfig: {
        loading: false,
        selectMode: "single",
        virtualList: true,
        columns: [],
        tablePage: {
          currentPage: 1,
          pageSize: 10,
          totalResult: 0
        }
      },
      searchStr: '',
      checkedData: []
    };
  },
  watch: {
    visible: {
      handler(newVal, oldVal) {
        this.modalConfig.visible = newVal;
      },
      deep: true
    },
    'extraProp.totalResult': {
      handler(newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
          this.lovTableBaseConfig.tablePage.totalResult = newVal;
        }
      }
    },
    'extraProp.columns': {
      handler(newVal, oldVal) {
        this.lovTableBaseConfig.columns = newVal;
      }
    },
    'extraProp.loading': {
      handler(newVal, oldVal) {
        this.lovTableBaseConfig.loading = newVal;
      }
    },
    'extraProp.selectMode': {
      handler(newVal, oldVal) {
        this.lovTableBaseConfig.selectMode = newVal;
      },
      immediate: true
    },
    'extraProp.dataCode': {
      handler(newVal, oldVal) {
        this.lovTableBaseConfig.rowId = newVal;
      },
      immediate: true
    }
  },
  methods: {
    handleOk(e) {
      this.extraProp.tableData = [];
      this.resetTablePage();
      this.$refs.dapUiTable.clearChecked();
      const data = {
        selection: this.checkedData
      };
      this.$formEventEmit('lov-ok', data)
    },
    handleCancel(e) {
      this.resetTablePage();
      this.$formEventEmit('lov-cancel', e);
    },
    resetTablePage() {
      this.lovTableBaseConfig.tablePage.currentPage = 1;
      this.lovTableBaseConfig.tablePage.pageSize = 10;
    },
    onSearch(searchStr) {
      this.searchStr = searchStr;
      this.resetTablePage();
      this.$formEventEmit('query-lov-data', {
        currentPage: this.lovTableBaseConfig.tablePage.currentPage,
        pageSize: this.lovTableBaseConfig.tablePage.pageSize,
        searchStr: this.searchStr,
        value: this.value
      });
    },
    handlePageChange(e) {
      this.lovTableBaseConfig.tablePage.currentPage = e.currentPage;
      this.lovTableBaseConfig.tablePage.pageSize = e.pageSize;
      this.$formEventEmit('query-lov-data', {
        currentPage: this.lovTableBaseConfig.tablePage.currentPage,
        pageSize: this.lovTableBaseConfig.tablePage.pageSize,
        searchStr: this.searchStr,
        value: this.value
      });
    },
    handleSelectChange(e) {
      this.checkedData = this.$refs.dapUiTable.getAllChecked();
    },
    handlerCloseSelectedTag(tag, index) {
      const row = this.extraProp.tableData.filter(item => item[this.extraProp.dataCode] === tag[this.extraProp.dataCode])[0];
      if (row) {
        this.$refs.dapUiTable.onCheckRow(row);
      }
    },
    setCheckedData(checkedData) {
      this.checkedData = checkedData;
      setTimeout(() => {
        this.$refs.dapUiTable.checkedData = this.checkedData;
      }, 100);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
