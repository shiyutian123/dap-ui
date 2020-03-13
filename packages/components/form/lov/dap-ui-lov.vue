<!--
 * @Author: your name
 * @Date: 2020-02-21 16:38:40
 * @LastEditTime: 2020-03-11 17:54:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/components/form/lov/dap-ui-lov.vue
 -->
<template>
  <div class="dap-ui-lov dap-ui-form-item dap-ui-form-input">
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :has-feedback="hasFeedback"
      :validate-status="validateStatus"
      :extra="extra"
      :required="required"
      :colon="colon"
      :help="help">
      <template v-slot:label>
        <span :style="{color: labelColor}">{{label}}</span>
      </template>
      <div
      v-if="extraProp.selectMode !== 'multipart'"
      @click="onClickLovInput">
        <a-tooltip :title="computTooltip">
          <a-input
          class="lov-input"
          :readonly="true"
          :disabled="disabled"
          :value="value"
          :placeholder="placeholder"
          :defaultValue="defaultValue"
          :allowClear="allowClear"
          >
            <a-icon slot="addonAfter" type="search" />
          </a-input>
      </a-tooltip>
      </div>
      <div v-if="extraProp.selectMode === 'multipart'">
        <span class="lov-input ant-input-group-wrapper">
          <span class="ant-input-wrapper ant-input-group">
            <a-tooltip :title="computTooltip">
              <div class="ant-input lov-input" style="border-radius: 4px; display: flex; position: absolute;">
                <div class="tags" v-if="Array.isArray(value)">
                  <a-tag v-for="(item, index) in value" :closable="!disabled" :key="index" @close="handlerCloseTag(item, index)">{{ item }}</a-tag>
                </div>
              <a-button v-if="!disabled" style="min-width: 24px; min-height: 24px;" shape="circle" size="small" icon="plus" @click="onClickLovInput"></a-button>
            </div>
            </a-tooltip>
          </span>
        </span>
      </div>
    </a-form-item>
    <dap-ui-modal
    v-bind="modalConfig"
    @ok="handleOk"
    @cancel="handleCancel">
      <div class="lov-choose-block">
        <a-input-search :placeholder="placeholder" @search="onSearch">
          <a-button type="primary" slot="enterButton">
            <a-icon type="search" />
          </a-button>
        </a-input-search>
        <dap-ui-table
        :table-base-config="lovTableBaseConfig"
        :table-data.sync="extraProp.tableData"
        @page-change="handlePageChange"
        @select-change="handleSelectChange"
        ></dap-ui-table>
      </div>
    </dap-ui-modal>
  </div>
</template>

<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: 'DapUiLov',
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  computed: {
    computTooltip: function () {
      if (Array.isArray(this.value)) {
        return this.value.join(',');
      } else {
        return this.value;
      }
    },
    computedValue: function() {
      if (this.extraProp.selectMode === 'multipart') {
        if (value === '' || !value) {
          return []
        } else {
          return Array.isArray(this.value) ? this.value : [this.value];
        }
      } else {
        return value;
      }
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
    }
  },
  created() {
    this.lovTableBaseConfig.selectMode = this.extraProp.selectMode;
  },
  methods: {
    onClickLovInput(e) {
      if (!this.disabled) {
        this.modalConfig.visible = true;
        this.$formEventEmit('query-lov-data', {
          currentPage: this.lovTableBaseConfig.tablePage.currentPage,
          pageSize: this.lovTableBaseConfig.tablePage.pageSize
        });
        // 计算表格高度
        setTimeout(() => {
          const height = document.querySelector('.dap-ui-lov-modal .lov-choose-block').clientHeight - 88;
          this.lovTableBaseConfig.maxHeight = `${height}px`;
        }, 60);
      }
    },
    handleOk(e) {
      this.extraProp.tableData = [];
      this.resetTablePage();
      this.modalConfig.visible = false;
      const data = {
        selection: this.checkedData
      };
      this.$formEventEmit('lov-ok', data)
    },
    handleCancel(e) {
      this.resetTablePage();
      this.modalConfig.visible = false;
      this.$formEventEmit('lov-cancel', e)
    },
    resetTablePage() {
      this.lovTableBaseConfig.tablePage.currentPage = 1;
      this.lovTableBaseConfig.tablePage.pageSize = 10;
    },
    handlePageChange(e) {
      this.lovTableBaseConfig.tablePage.currentPage = e.currentPage;
      this.lovTableBaseConfig.tablePage.pageSize = e.pageSize;
      this.$formEventEmit('query-lov-data', {
        currentPage: this.lovTableBaseConfig.tablePage.currentPage,
        pageSize: this.lovTableBaseConfig.tablePage.pageSize,
        searchStr: this.searchStr
      });
    },
    handleSelectChange(e) {
      this.checkedData = e.selection;
    },
    onSearch(searchStr) {
      this.searchStr = searchStr;
      this.resetTablePage();
      this.$formEventEmit('query-lov-data', {
        currentPage: this.lovTableBaseConfig.tablePage.currentPage,
        pageSize: this.lovTableBaseConfig.tablePage.pageSize,
        searchStr: this.searchStr
      });
    },
    handlerCloseTag(tag, index) {
      this.value.splice(index, 1);
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.$formEventEmit('change', newVal);
      }
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
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
