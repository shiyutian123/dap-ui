<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-20 16:10:30
 * @Description: file content description
 -->
<template>
  <div
    class="dap-ui-input-num dap-ui-form-item dap-ui-form-input dap-ui-input-colum"
  >
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
      <div v-if="viewable" class="ant-input no-border text-ellipsis">{{ value }}</div>
      <a-input
        v-else
        :value="value"
        @input="dataChangeEvent($event)"
        :placeholder="placeholder" 
        :defaultValue="defaultValue"
        :disabled="disabled"
        :allowClear="allowClear" />
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiInputNum",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  methods: {
    dataChangeEvent($event) {
      const number = new Number($event.target.value);
      if (isNaN(number)) {
        $event.preventDefault();
        $event.stopPropagation();
      } else {
        this.$formEventEmit('change', $event.target.value);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
