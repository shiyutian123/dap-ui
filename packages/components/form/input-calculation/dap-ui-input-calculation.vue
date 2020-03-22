<!--
 * @Author: Trevor
 * @Email: wei.tang@definesys.com
 * @Date: 2020-03-10 14:13:17
 * @LastEditTime: 2020-03-20 16:11:29
 * @LastEditors: your name
 * @Description: file content
 -->
<template>
  <div
    class="dap-ui-input-calculation dap-ui-form-item dap-ui-form-input dap-ui-input-colum"
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
  },
  watch: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
