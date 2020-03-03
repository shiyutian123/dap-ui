<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-26 14:38:22
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-input-tel dap-ui-form-item dap-ui-form-input">
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
        :value="getTel()"
        @input="dataChangeEvent($event)"
        :placeholder="placeholder" 
        :defaultValue="defaultValue"
        :disabled="disabled"
        :allowClear="allowClear" />
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiInputTel",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  computed: {
  
  },
  props: {
  },
  methods: {
    dataChangeEvent($event) {
      const tel = $event.target.value && $event.target.value.replace(/ /g, '');
      if (!(/^\d*$/.test(tel)) || tel.length > 11) {
        $event.preventDefault();
        $event.stopPropagation();
        // this.$formEventEmit('change', tel);
      } else {
        this.$formEventEmit('change', tel);
      }
    },
    getTel() {
      if ((/^1[3456789]\d{9}$/.test(this.value))) {
        return this.value.substring(0, 3) + ' ' + this.value.substring(3, 7) + ' ' + this.value.substring(7, 11)
      } else {
        return this.value;
      }
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
