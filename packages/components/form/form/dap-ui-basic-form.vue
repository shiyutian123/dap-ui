<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-12 02:15:02
 * @Description: file content description
 -->
<template>
  <!-- 表单渲染，支持JSON Schema格式的渲染方式 -->
  <div class="dap-ui-basic-form dap-ui-form">
    <dap-ui-basic-form-item
      v-for="itemConfig of formConfig"
      :key="itemConfig.uuid"
      :rowSpan="itemConfig.rowSpan"
      :colSpan="itemConfig.colSpan"
      :uuid="itemConfig.uuid">
      <component 
        :required="itemConfig.required"
        :is="itemConfig.componentName"
        :label="itemConfig.label"
        v-if="itemConfig.dataCode"
        v-model="formData[itemConfig.dataCode]"></component>
    </dap-ui-basic-form-item>
    {{$v}}
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "DapUiBasicForm",
  model: {
    prop: 'formData',
    event: 'change'
  },
  data: {
    currentFormData: {}
  },
  mixins: [validationMixin],
  validations() {
    const currentFormData = {};
    for (let itemConfig of formConfig) {
      if (itemConfig.required) {
        currentFormData[itemConfig.dataCode] = {
          required
        }
      }
    }
    return {
      currentFormData: currentFormData
    }
  },
  props: {
    formData: {
      type: Object,
      default: {}
    },
    formConfig: {
      type: Object,
      default: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
