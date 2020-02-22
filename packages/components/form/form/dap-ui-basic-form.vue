<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-21 18:45:29
 * @Description: file content description
 -->
<template>
  <!-- 表单渲染，支持JSON Schema格式的渲染方式 -->
  <div class="dap-ui-basic-form dap-ui-form">
      <dap-ui-basic-form-item
        :rowSpan="itemConfig.rowSpan"
        :colSpan="itemConfig.colSpan"
        :uuid="itemConfig.uuid"
        v-for="itemConfig of visiableFormConfig"
        :key="itemConfig.uuid">
          <component
            v-if="itemConfig.visiable && $baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_INPUT'"
            :has-feedback="false"
            :label-color="itemConfig.labelColor"
            :validate-status="$v.currentFormData[itemConfig.dataCode].$dirty && $v.currentFormData[itemConfig.dataCode].$error ? 'error' : 'success'"
            :help="$v.currentFormData[itemConfig.dataCode].$dirty && $v.currentFormData[itemConfig.dataCode].$error ? itemConfig.label + '为必填' : undefined"
            :required="itemConfig.required"
            :is="itemConfig.componentName"
            :label="itemConfig.label"
            :value="currentFormData[itemConfig.dataCode]"
            :uuid="itemConfig.uuid"
            :disabled="itemConfig.disabled"
            :placeholder="itemConfig.placeholder"
            :componentName="itemConfig.componentName"
            :extraProp="itemConfig.extraProp"
            @formEventEmit="formEventEmit($event)"
            @change="formValueChange(itemConfig.dataCode, $event)"></component>
          
          <component
            :label="itemConfig.label"
            v-if="itemConfig.visiable && $baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_STATIC_RENDER'"
            :is="itemConfig.componentName"
            :uuid="itemConfig.uuid"
            :componentName="itemConfig.componentName"
            @formEventEmit="formEventEmit($event)"
            :label-color="itemConfig.labelColor"></component>

          <component
            :ref="itemConfig.uuid"
            v-if="itemConfig.visiable && $baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_LAYOUT'"  
            v-model="currentFormData"
            @validate="validateChange(itemConfig.uuid, $event)"
            :layoutConfig="itemConfig"
            :uuid="itemConfig.uuid"
            :componentName="itemConfig.componentName"
            @formEventEmit="formEventEmit($event)"
            :is="itemConfig.componentName"></component>

            <a-empty 
                image=""
                v-if="!$baseFormRegister.getComponentType(itemConfig.componentName) || !$baseFormRegister.hasComponent(itemConfig.componentName)">
                <span slot="description"> `{{itemConfig.componentName}}` 组件未注册 </span>
            </a-empty>
      </dap-ui-basic-form-item>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ValidateUtil from '../../../utils/validate.util.js'

export default {
  name: "DapUiBasicForm",
  model: {
    prop: 'formData',
    event: 'change'
  },
  mixins: [validationMixin],
  data: function() {
    return {
      currentFormData: {},
      childrenValidate: {}
    }
  },
  computed: {
    visiableFormConfig: function() {
      return this.formConfig.filter(itemConfig => {
        return itemConfig.visiable;
      })
    }
  },
  // 添加验证器
  validations() {
    const currentFormData = {};
    for (let itemConfig of this.formConfig) {
      if (itemConfig.required) {
        currentFormData[itemConfig.dataCode] = {
          required
        }
      } else {
        currentFormData[itemConfig.dataCode] = {}
      }
    }
    return {
      currentFormData: currentFormData
    }
  },
  methods: {
      formValueChange(dataCode, value) {
        this.$set(this.currentFormData, dataCode, value);
        this.$emit('change', this.currentFormData);
        this.$v.currentFormData[dataCode].$touch();
      },
      validateChange(uuid, value) {
        this.childrenValidate[uuid] = value;
      },
      getValidateError() {
        let validateArray = [];
        validateArray.push(this.$v);
        validateArray = [
          ...validateArray,
          ...Object.values(this.childrenValidate)
        ];
        return ValidateUtil.mergeValidate(validateArray);
      },
      validateTouch() {
        this.$v.$touch();
        this.formConfig.forEach(itemConfig => {
          if (this.$baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_LAYOUT') {
            if ( this.$refs[itemConfig.uuid] &&  this.$refs[itemConfig.uuid][0]) {
              this.$refs[itemConfig.uuid][0].validateTouch();
            }
          }
        })
      },
      resetForm() {
        this.$v.$reset();
        this.formConfig.forEach(itemConfig => {
          if (this.$baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_LAYOUT') {
            if ( this.$refs[itemConfig.uuid] &&  this.$refs[itemConfig.uuid][0]) {
              this.$refs[itemConfig.uuid][0].resetForm();
            }
          }
        })
        // this.currentFormData = this.formData;
      },
      /**
       * 表单事件自动触发
       */
      formEventEmit($event) {
        // 表单事件发送
        this.$baseFormRegister.excuteAdapterEvent($event.componentName, $event)
        this.$emit('formEventEmit', $event);
      }
  },
  watch: {
    formData: {
      handler: function(newVal,oldVal) {
        if (this.currentFormData !== newVal && newVal) {
          this.currentFormData = newVal ;
        }
      },
      deep: true
    }
  },
  props: {
    formData: {
      type: Object,
      default: {}
    },
    formConfig: {
      type: Array,
      default: []
    },
    validate: {
      type: Object,
    }
  },
  created() {
    this.currentFormData = this.formData ;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
