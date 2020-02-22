<!--
 * @Author: your name
 * @Date: 2020-02-21 16:38:40
 * @LastEditTime: 2020-02-21 19:07:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/components/form/lov/dap-ui-lov.vue
 -->
<template>
  <div class="dap-ui-lov dap-ui-form-item dap-ui-form-input">
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
      <div
      @click="onClickLovInput">
        <a-input
        class="lov-input"
        :readonly="true"
        :value="value"
        :placeholder="placeholder"
        :defaultValue="defaultValue"
        :allowClear="allowClear"
        >
          <a-icon slot="addonAfter" type="search" />
        </a-input>
      </div>
    </a-form-item>
    <dap-ui-modal
    v-bind="modalConfig"
    @ok="handleOk"
    @cancel="handleCancel">
      <div class="lov-choose-block">
        <a-input-search :placeholder="placeholder" @search="onSearch">
          <a-button type="primary" slot="enterButton">
            <a-icon type="search" />
          </a-button>
        </a-input-search>
        <dap-ui-table
        :table-base-config="lovTableBaseConfig"
        :table-data="lovTableData"></dap-ui-table>
      </div>
    </dap-ui-modal>
  </div>
</template>

<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: 'DapUiLov',
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  data() {
    return {
      modalConfig: {
        visible: false,
        title: '数据选择',
        size: 'medium',
        modalClass: 'dap-ui-lov-modal'
      },
      lovTableBaseConfig: {
        selectMode: "single",
        height: '220px',
        virtualList: true
      },
      lovTableData: []
    }
  },
  methods: {
    onClickLovInput(e) {
      if (!this.disabled) {
        this.modalConfig.visible = true;
      }
    },
    handleOk(e) {
      this.modalConfig.visible = false;
    },
    handleCancel(e) {
      this.modalConfig.visible = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
