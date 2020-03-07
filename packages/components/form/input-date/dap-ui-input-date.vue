<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-27 15:37:08
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-input-date dap-ui-form-item dap-ui-form-input">
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
      <a-date-picker class="input-date"
        :value="getDate(value)"
        @change="onChange"
        :placeholder="placeholder" 
        :disabled="disabled"
        :allowClear="true"
        :showTime="extraProp.showTime"/>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';
import moment from 'moment';

export default {
  name: "DapUiInputDate",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  data() {
    return {
      dataFormat: 'YYYY-MM-DD',
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  methods: {
    moment,
    onChange(date, dateString) {
      this.$formEventEmit('change', dateString);
    },
    getDate(value) {
      if (value) {
        if (this.extraProp.showTime) {
          return this.moment(value, this.dateTimeFormat);
        } else {
          return this.moment(value, this.dataFormat);
        }
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
