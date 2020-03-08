<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-25 14:42:16
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-select dap-ui-form-item dap-ui-form-input">
    <!-- multi ? 'multiple' : 'default' -->
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
            :autoClearSearchValue="true"
            :mode="multi ? 'multiple' : 'default'"
            :maxTagCount="3"
            :loading="extraProp.loading"
            :showArrow="true"
            @change="selectFormEmit('change', $event)"
            @dropdownVisibleChange="$formEventEmit('dropdownVisibleChange', $event)">
            <a-select-option v-for="option in options" 
                :key="option.label"
                :title="option.label">{{option.label}}</a-select-option>
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
  },
  methods: {
    // filterOption(input, option) {
    //   return option.componentOptions.propsData.title && option.componentOptions.propsData.title.indexOf(input) !== -1;
    // },
    selectFormEmit(eventName, event) {
      if (event) {
        this.$formEventEmit('change', event);

        const selectOptions = [];
        if (!Array.isArray(event)) {
          event = [event];
        }
        event.forEach(data => {
          this.options.some(option => {
            if (option.label === data) {
              selectOptions.push(option)
              return true;
            }
          })
        })
        this.$formEventEmit('updateTransValue', selectOptions);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
