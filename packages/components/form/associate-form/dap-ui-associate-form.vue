<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-19 16:02:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-associate-form-link dap-ui-form-item">
    <span
        v-if="extraProp.mode === 'link'"
        @click="$formEventEmit('click', $event)"
        class="associate-form-link" 
        :style="{color: labelColor}">
        <a-icon type="link" />
        {{label}}</span>
    <div v-if="extraProp.mode === 'table'" class="dap-ui-associate-form-table">
      <div class="dap-ui-associate-form-table-header">
        <div class="title">
          <span :style="{'color': labelColor}">关联{{ extraProp.associate.associateformName }}</span>
        </div>
        <div class="operation">
          <a-button type="primary" size="small">新建记录</a-button>
          <a-button style="margin-left: 1rem;" type="primary" size="small">关联记录</a-button>
          <a-button style="margin-left: 1rem;" type="default" size="small">取消关联</a-button>
        </div>
      </div>
      <dap-ui-table
        ref="horizontalTable"
        :table-data.sync="value"
        :table-base-config="tableBaseConfig"
      ></dap-ui-table>
    </div>
  </div>
</template>
<script>
import InputComponentMixin from "../../../mixins/input-component-mixin.js";
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiAssociateForm",
  type: 'FORM_STATIC_RENDER',
  mixins: [BasicComponentMixin, InputComponentMixin],
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      tableBaseConfig: {
        selectMode: "multipart",
        maxHeight: "240px",
        virtualList: true,
        sortable: true,
        columns: [],
        tableData: []
      },
      readOnly: false
    };
  },
  watch: {
    columns: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.tableBaseConfig.columns = newValue;
          // readonly
          const flag = newValue.every(item => item.readOnly);
          this.readOnly = flag;
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.extraProp.mode === 'table') {
      this.$formEventEmit('init-associate-config');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
