<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 11:01:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-marking dap-ui-form-item dap-ui-form-input">
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
        <span >{{label}}</span>
      </template>
      <a-rate
        :style="{color: labelColor}"
        :value="getValue()"
        :disabled="disabled"
        :defaultValue="getDefaultValue()"
        allowHalf
        :allowClear="disabled ? false : true"
        @change="$formEventEmit('change', $event)">
      </a-rate>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiMarking",
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
  methods: {
    getDefaultValue() {
      if (this.defaultValue) {
        return parseFloat(this.defaultValue);
      } else {
        return 0;
      }
    },
    getValue() {
      if (this.value) {
        return parseFloat(this.value);
      } else {
        return 0;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
