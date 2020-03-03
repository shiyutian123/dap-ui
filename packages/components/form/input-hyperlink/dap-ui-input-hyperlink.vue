<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 11:01:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-input-hyperlink dap-ui-form-item dap-ui-form-input">
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
      <a v-if="value" @click="goLink(value)">{{value}}</a>
      <div v-if="!value">无</div>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiInputHyperlink",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  watch: {
    defaultValue : {
      handler (newValue, oldValue) {
        if (!this.value && newValue) {
          this.$formEventEmit('change', newValue);
        }
      },
      immediate:true,
    }
  },
  methods: {
    goLink(value) {
      const url = 'http://';
      if (value.slice(0, 7) === 'http://' || value.slice(0, 7) === 'https:/') {
        window.open(value, "_blank");
      } else {
        window.open(url + value, "_blank");
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
