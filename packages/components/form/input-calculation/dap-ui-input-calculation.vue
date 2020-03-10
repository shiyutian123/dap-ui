<!--
 * @Author: Trevor
 * @Email: wei.tang@definesys.com
 * @Date: 2020-03-10 14:13:17
 * @LastEditTime: 2020-03-10 14:18:20
 * @LastEditors: your name
 * @Description: file content
 -->
<template>
  <div class="dap-ui-input-calculation dap-ui-form-item dap-ui-form-input">
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
      <a-input 
        :value="value"
        @input="$formEventEmit('change', $event.target.value)"
        :placeholder="placeholder" 
        :defaultValue="defaultValue"
        :disabled="true"
        :allowClear="allowClear"/>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiInputCalculation",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
