<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 14:33:03
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-select dap-ui-form-item dap-ui-form-input">
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
        <a-select 
            :allowClear="allowClear"
            :disabled="disabled"
            :defaultValue="defaultValue" 
            :placeholder="placeholder" 
            :value="value"
            :loading="extraProp.loading"
            @change="$formEventEmit('change', $event)"
            @dropdownVisibleChange="$formEventEmit('dropdownVisibleChange', $event)">
            <a-select-option v-for="option in options" 
                :value="option.value"
                :key="option.value">{{option.label}}</a-select-option>
        </a-select>
    </a-form-item>
  </div>
</template>
<script>

import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiSelect",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
