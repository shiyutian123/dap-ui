<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 11:01:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-radio dap-ui-form-item dap-ui-form-input">
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
      <a-radio-group 
        :disabled="disabled"
        :defaultValue="defaultValue"
        @change="$formEventEmit('change', $event.target.value)"
        :value="value">
        <a-radio v-for="option in options" :value="option.value" :key="option.value">{{option.label}}</a-radio>
      </a-radio-group>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiRadio",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  watch: {
    options: {
      handler: function(val,oldval){
        if ((!this.value || this.value.length === 0) && Array.isArray(val) && val.length > 0) {
          this.$formEventEmit('change', val[0].value);
        }
      },
      deep: true,
      immediate: true,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
