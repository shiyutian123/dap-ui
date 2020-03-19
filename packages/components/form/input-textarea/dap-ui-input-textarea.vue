<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-19 18:11:58
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-input-textarea dap-ui-form-item dap-ui-form-input dap-ui-textarea-column">
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
      <a-textarea class="textarea"
        :value="value"
        @input="$formEventEmit('change', $event.target.value)"
        :placeholder="placeholder" 
        :defaultValue="defaultValue"
        :disabled="disabled"
        :allowClear="allowClear"
        :rows="colSpan + 1"
      />
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiInputTextarea",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
