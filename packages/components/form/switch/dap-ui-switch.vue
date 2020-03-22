<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-22 13:33:23
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-switch dap-ui-form-item dap-ui-form-input">
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
      <div v-if="viewable" class="ant-input no-border text-ellipsis">
        <a-switch
          :checked="value"
          :disabled="true">
        </a-switch>
      </div>
      <a-switch
        :checked="value"
        :disabled="disabled"
        @change="$formEventEmit('change', $event)">
      </a-switch>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiSwitch",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  // watch: {
  //   value: {
  //     handler (newValue, oldValue) {
  //       if (newValue === undefined) {
  //         this.$formEventEmit('change', false);
  //       }
  //     },
  //     immediate: true
  //   }
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
