<!--
 * @Author: your name
 * @Date: 2020-02-20 10:13:07
 * @LastEditTime: 2020-02-20 18:08:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/components/form/table-extend/dap-ui-table-extend.vue
 -->
<template>
  <div class="dap-ui-table-extend">
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
    ></dap-ui-table>
    <div v-if="displayType === 'vertical'" class="vertical-table">
      <dap-ui-table
        ref="verticalTable"
        :table-data.sync="value"
        :table-base-config="verticalTableBaseConfig"
      >
        <template v-slot:customColumn="{ row, rowIndex }">
          <div class="vertical-row">
            <div class="column" v-for="(column, index) in tableBaseConfig.columns" :key="index">
              <a-tooltip :title="column.title">
                <span class="label" :class="{ required: column.required }">{{ column.title }}：</span>
              </a-tooltip>
              <div class="value">{{ row[column.field] }}</div>
            </div>
          </div>
        </template>
      </dap-ui-table>
    </div>
  </div>
</template>

<script>
import InputComponentMixin from "../../../mixins/input-component-mixin.js";
import BasicComponentMixin from "../../../mixins/basic-component-mixin.js";

export default {
  name: "DapUiTableExtend",
  type: "FORM_INPUT",
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
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
          const columns = [];
          newValue.map(item => {
            const column = {
              field: item.formControlName,
              title: item.title,
              required: item.required
            };
            columns.push(column);
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
      this.$formEventEmit('delete-record', {
        mouseEvent: e,
        checkedData: checkedData
      });
    }
  }
};
</script>
<style src="./index.less" lang="less"></style>
