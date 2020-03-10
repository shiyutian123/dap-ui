<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-05 16:55:12
 * @Description: file content description
 -->
<template>
  <!-- 表单渲染，支持JSON Schema格式的渲染方式 -->
  <div class="dap-ui-basic-form dap-ui-form">
      <component
        :is="formItemName"
        :rowSpan="itemConfig.rowSpan"
        :colSpan="itemConfig.colSpan"
        :uuid="itemConfig.uuid"
        v-for="itemConfig of visiableFormConfig"
        :itemConfig="itemConfig"
        :globalFormInfo="globalFormInfo"
        :key="itemConfig.uuid">
      <!-- <dap-ui-basic-form-item
        :rowSpan="itemConfig.rowSpan"
        :colSpan="itemConfig.colSpan"
        :uuid="itemConfig.uuid"
        v-for="itemConfig of visiableFormConfig"
        :key="itemConfig.uuid"> -->
          <component
            v-if="itemConfig.visiable && $baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_INPUT'"
            :defaultValue="itemConfig.defaultValue"
            :has-feedback="false"
            :label-color="itemConfig.labelColor"
            :validate-status="$v.currentFormData[itemConfig.dataCode].$dirty && $v.currentFormData[itemConfig.dataCode].$error ? 'error' : 'success'"
            :help="validationText(itemConfig)"
            :required="itemConfig.required"
            :is="itemConfig.componentName"
            :label="itemConfig.label"
            :value="currentFormData[itemConfig.dataCode]"
            :transValue.sync="currentFormData[itemConfig.transDataCode]"
            :uuid="itemConfig.uuid"
            :options="itemConfig.options"
            :disabled="isDisabled(itemConfig)"
            :placeholder="itemConfig.placeholder"
            :componentName="itemConfig.componentName"
            :columns="itemConfig.columnSet"
            :extraProp="itemConfig.extraProp"
            :colSpan="itemConfig.colSpan"
            :multi="itemConfig.multi"
            :documentId="globalFormInfo ? globalFormInfo.documentId : undefined"
            @formEventEmit="formEventEmit($event)"
            @updateTransValue="formValueTransChange(itemConfig.transDataCode, $event)"
            @change="formValueChange(itemConfig.dataCode, $event)"></component>
          
          <component
            :label="itemConfig.label"
            v-if="itemConfig.visiable && $baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_STATIC_RENDER'"
            :is="itemConfig.componentName"
            :uuid="itemConfig.uuid"
            :componentName="itemConfig.componentName"
            :extraProp="itemConfig.extraProp"
            @formEventEmit="formEventEmit($event)"
            :label-color="itemConfig.labelColor"
            :colSpan="itemConfig.colSpan"></component>
          
          <component
            :label="itemConfig.label"
            v-if="itemConfig.visiable && $baseFormRegister.getComponentType(itemConfig.componentName) === 'FORM_ATTACHMENT'"
            :is="itemConfig.componentName"
            :uuid="itemConfig.uuid"
            :componentName="itemConfig.componentName"
            :value="currentFormData[itemConfig.dataCode]"
            :customRequest="itemConfig.customRequest"
            :remove="itemConfig.remove"
            :fileCodeList="itemConfig.fileCodeList"
            :documentId="globalFormInfo ? globalFormInfo.documentId : undefined"
            :btnTitle="itemConfig.btnTitle"
            :uploadSize="itemConfig.uploadSize"
            :tableData="itemConfig.tableData"
            :beforeUpload="itemConfig.beforeUpload"
            :editOnNew="itemConfig.editOnNew"
            @formEventEmit="formEventEmit($event)"
            @change="formValueChange(itemConfig.dataCode, $event)"
            ></component>

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
      </component>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import phone from '../../../validates/phone.validate.js'
import table from '../../../validates/table.validate.js';
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
        return itemConfig && itemConfig.visiable;
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

      if (itemConfig.componentName === "dap-ui-input-email") {
        currentFormData[itemConfig.dataCode]['email'] = email;
      } else if (itemConfig.componentName === "dap-ui-input-tel") {
        currentFormData[itemConfig.dataCode]['phone'] = phone
      } else if (itemConfig.componentName === "dap-ui-table-extend") {
        currentFormData[itemConfig.dataCode]['required'] = table.required(itemConfig);
      }
    }
    return {
      currentFormData: currentFormData
    }
  },
  methods: {
      formValueTransChange(transDataCode, value) {
        this.$set(this.currentFormData, transDataCode, value);
        this.$emit('change', this.currentFormData);
      },
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
        this.$baseFormRegister.excuteAdapterEvent($event.componentName, $event, this.formConfig, this.globalFormInfo, this.formData)
        this.$emit('formEventEmit', $event);
      },
      /**
       * @author lizhihang
       * @param itemConfig 表单配置
       * @description 校验提示文字
       * @date 2020-2-27
       */
      validationText(itemConfig) {
        if (this.$v.currentFormData[itemConfig.dataCode].$dirty && this.$v.currentFormData[itemConfig.dataCode].$error) {
          // console.log(this.$v.currentFormData[itemConfig.dataCode]);
          if (!this.$v.currentFormData[itemConfig.dataCode].required) {
            // 如果是必填校验，则显示 xxx为必填
            return itemConfig.label +  '为必填';
          } else {
            // 如果是其他校验（如邮箱校验），则显示 xxx格式不正确
            return itemConfig.label +  '格式不正确';
          }
        } else {
          return undefined;
        }
      },
      /**
       * @author lizhihang
       * @description 组件是否disable。disabled属性优先级高。
       * @date 2020-3-3
       */
      isDisabled(itemConfig) {
        if (itemConfig.disabled) {
          // 如果只读 返回true
          return true;
        } else if (itemConfig.editOnNew && this.globalFormInfo.documentId) {
          // 如果新建可编辑，当前是编辑时，返回ture
          return true;
        } else {
          return false;
        }
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
      default: function() {
        return {};
      }
    },
    formConfig: {
      type: Array,
      default: function() {
        return [];
      }
    },
    globalFormInfo: {

    },
    validate: {
      type: Object,
    },
    formItemName: {
      type: String,
      default: 'dap-ui-basic-form-item'
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
