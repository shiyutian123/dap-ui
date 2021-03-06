<!--
 * @Author: your name
 * @Date: 2020-02-20 10:13:07
 * @LastEditTime: 2020-03-10 20:56:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/components/form/table-extend/dap-ui-table-extend.vue
 -->
<template>
  <div class="dap-ui-table-extend" :class="{'validate-error': validateStatus === 'error'}">
    <div class="dap-ui-table-extend-title">
      <div class="title">
        <span :style="{'color': labelColor}">{{ label }}</span>
      </div>
      <div class="operation">
        <span>显示方式：</span>
        <a-radio-group v-model="displayType">
          <a-radio
            v-for="(item, index) in displayTypeLabels"
            :key="index"
            :value="item.value"
          >{{ item.label }}</a-radio>
        </a-radio-group>
        <a-button v-if="!readOnly" type="primary" size="small" @click="onClickAdd">新建记录</a-button>
        <a-button v-if="!readOnly" style="margin-left: 1rem;" type="primary" size="small" @click="onClickCopy">复制新建</a-button>
        <a-button v-if="!readOnly" style="margin-left: 1rem;" type="default" size="small" @click="onClickDelete">删除</a-button>
      </div>
    </div>
    <dap-ui-table
      v-if="displayType === 'horizontal'"
      ref="horizontalTable"
      :table-data.sync="value"
      :table-base-config="tableBaseConfig"
      @cell-click="onCellClick"
    >
      <template v-slot:customColumn="{ row, rowIndex, column }">
        <component
          :has-feedback="false"
          :label-color="column.labelColor"
          :required="column.required"
          :is="column.componentName"
          :label="column.label"
          :value="row[column.dataCode]"
          :transValue.sync="row[column.transDataCode]"
          :uuid="column.uuid"
          :options="column.options"
          :disabled="column.disabled"
          :placeholder="column.placeholder"
          :componentName="column.componentName"
          :columns="column.columnSet"
          :extraProp="column.extraProp"
          :colSpan="column.colSpan"
          :multi="column.multi"
          :defaultValue="column.defaultValue"
          @formEventEmit="formEventEmit($event, {
            row: row,
            rowIndex: rowIndex,
            column: column
          })"
          @updateTransValue="formValueTransChange(row, column.transDataCode, $event)"
          @change="formValueChange(row, column.dataCode, $event)"></component>
          <a-empty 
            image=""
            v-if="!$baseFormRegister.getComponentType(column.componentName) || !$baseFormRegister.hasComponent(column.componentName)">
            <span slot="description"> `{{column.componentName}}` 组件未注册 </span>
          </a-empty>
      </template>
    </dap-ui-table>
    <div v-if="displayType === 'vertical'" class="vertical-table">
      <dap-ui-table
        ref="verticalTable"
        :table-data.sync="value"
        :table-base-config="verticalTableBaseConfig"
        @cell-click="onCellClick"
      >
        <template v-slot:customColumn="{ row, rowIndex }">
          <div class="vertical-row">
            <div class="column" v-for="(column, index) in tableBaseConfig.columns" :key="index">
              <a-tooltip :title="column.title">
                <span class="label" :class="{ required: column.required }">{{ column.title }}：</span>
              </a-tooltip>
              <div class="value">
                <component
                :has-feedback="false"
                :label-color="column.labelColor"
                :required="column.required"
                :is="column.componentName"
                :label="column.label"
                :value="row[column.dataCode]"
                :transValue.sync="row[column.transDataCode]"
                :uuid="column.uuid"
                :options="column.options"
                :disabled="column.disabled"
                :placeholder="column.placeholder"
                :componentName="column.componentName"
                :columns="column.columnSet"
                :extraProp="column.extraProp"
                :colSpan="column.colSpan"
                :multi="column.multi"
                :defaultValue="column.defaultValue"
                @formEventEmit="formEventEmit($event, {
                  row: row,
                  rowIndex: rowIndex
                })"
                @updateTransValue="formValueTransChange(row, column.transDataCode, $event, {
                  row: row,
                  rowIndex: rowIndex
                })"
                @change="formValueChange(row, column.dataCode, $event, {
                  row: row,
                  rowIndex: rowIndex
                })"></component>
                <a-empty 
                  image=""
                  v-if="!$baseFormRegister.getComponentType(column.componentName) || !$baseFormRegister.hasComponent(column.componentName)">
                  <span slot="description"> `{{column.componentName}}` 组件未注册 </span>
                </a-empty>
              </div>
            </div>
          </div>
        </template>
      </dap-ui-table>
    </div>
    <div class="dap-ui-table-extend-footer">
      <div class="ant-form-explain">{{ help }}</div>
    </div>
  </div>
</template>

<script>
import InputComponentMixin from "../../../mixins/input-component-mixin.js";
import BasicComponentMixin from "../../../mixins/basic-component-mixin.js";
import { validationMixin } from 'vuelidate'

export default {
  name: "DapUiTableExtend",
  type: "FORM_INPUT",
  mixins: [InputComponentMixin, BasicComponentMixin, validationMixin],
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
        selectMode: "",
        maxHeight: "240px",
        virtualList: true
      },
      verticalTableBaseConfig: {
        selectMode: "",
        maxHeight: "240px",
        virtualList: true
      },
      displayType: "horizontal",
      displayTypeLabels: [
        {
          label: "横向(列表)",
          value: "horizontal"
        },
        {
          label: "纵向(单条明细)",
          value: "vertical"
        }
      ],
      readOnly: false
    };
  },
  watch: {
    columns: {
      handler(newValue, oldValue) {
        if (newValue) {
          const columns = newValue;
          columns.map(item => {
            item.slotName = 'customColumn';
          });
          this.tableBaseConfig.columns = columns; // 横向表格
          this.verticalTableBaseConfig.columns = [
            { field: "_", title: "", slotName: "customColumn" }
          ]; // 纵向表格
          // readonly
          const flag = newValue.every(item => item.readOnly);
          this.readOnly = flag;
          if (flag) {
            this.tableBaseConfig.selectMode = "";
            this.verticalTableBaseConfig.selectMode = "";
          } else {
            this.tableBaseConfig.selectMode = "multipart";
            this.verticalTableBaseConfig.selectMode = "multipart";
          }
        }
      },
      immediate: true
    }
    // value: {
    //   handler(newValue, oldValue) {
    //     if (!newValue) {
    //       this.$emit('update:value', []);
    //     }
    //   },
    //   immediate: true
    // }
  },

  mounted() {
    this.$formEventEmit('init-table-data');
  },
  methods: {
    scrollToLastRow() {
      const row = this.value[this.value.length - 1];
      if (this.displayType === "horizontal") {
        this.$refs.horizontalTable.scrollToRow(row);
      } else {
        this.$refs.verticalTable.scrollToRow(row);
      }
    },
    getCheckedData() {
      let checkedData;
      if (this.displayType === "horizontal") {
        checkedData = this.$refs.horizontalTable.getChekced();
      } else {
        checkedData = this.$refs.verticalTable.getChekced();
      }
      return checkedData;
    },
    onClickAdd(e) {
      const obj = {};
      this.tableBaseConfig.columns.map(item => {
        obj[item.field] = undefined;
      });
      this.value.push(obj);
      // this.$emit('update:value', Object.assign([], this.value));
      this.$emit('change', this.value);
      this.scrollToLastRow();
      this.$formEventEmit('add-record', {
        mouseEvent: e
      });
    },
    onClickCopy(e) {
      const checkedData = this.getCheckedData();
      const arr = [];
      checkedData.map(item => {
        const obj = {};
        this.tableBaseConfig.columns.map(column => {
          obj[column.field] = item[column.field];
        });
        arr.push(obj);
      });
      this.value.push(...arr);
      // this.$emit('update:value', Object.assign([], this.value));
      this.$emit('change', this.value);
      this.scrollToLastRow();
      this.$formEventEmit('copy-record', {
        mouseEvent: e
      });
    },
    onClickDelete(e) {
      const checkedData = this.getCheckedData();
      for (const item of checkedData) {
        this.value.splice(this.value.indexOf(item), 1);
      }
      // this.$emit('update:value', Object.assign([], this.value));
      this.$emit('change', this.value);
      this.$formEventEmit('delete-record', {
        mouseEvent: e,
        checkedData: checkedData
      });
    },
    onCellClick(e) {
      this.$formEventEmit('cell-click', e);
    },
    /**
     * 表单事件自动触发
     */
    formEventEmit($event, tableInfo) {
      $event.tableInfo = tableInfo
      // 表单事件发送
      this.$emit('formEventEmit', $event);
    },
    formValueTransChange(row, transDataCode, value) {
      this.$set(row, transDataCode, value);
      this.$emit('change', this.value);
    },
    formValueChange(row, dataCode, value) {
      this.$set(row, dataCode, value);
      this.$emit('change', this.value);
    }
  }
};
</script>
<style src="./index.less" lang="less"></style>
