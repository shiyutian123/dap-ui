<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-20 16:30:42
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-checkbox dap-ui-form-item dap-ui-form-input">
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
      <a-checkbox-group
        v-else
        :disabled="disabled"
        :defaultValue="defaultValue ? defaultValue : []"
        @change="change($event)"
        :value="value ? value : []">
        <a-checkbox v-for="option in options" :value="option.label" :key="option.label">{{option.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiCheckbox",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  methods: {
    change($event) {
      const selectOptions = [];
      $event.forEach(data => {
        this.options.some(option => {
          if (option.label === data) {
            selectOptions.push(option)
            return true;
          }
        })
      });
      this.$formEventEmit('change', $event);
      this.$formEventEmit('updateTransValue', selectOptions);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
