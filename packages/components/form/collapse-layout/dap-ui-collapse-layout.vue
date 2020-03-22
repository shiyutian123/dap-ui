<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-19 16:10:47
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-collapse-layout dap-ui-form-item dap-ui-collapse-column">
    <a-collapse v-model="activeKey">
      <a-collapse-panel v-for="(childLayout, index) in layoutConfig.children" :key="index">
        <template v-slot:header>
          <span :style="{color: childLayout.labelColor}">{{childLayout.label}}</span>
        </template>
        <dap-ui-basic-form 
          :ref="'validateForm'" 
          v-model="formData" 
          :isInLayout="true"
          :formConfig="childLayout.children" 
          @formEventEmit="formEvent"></dap-ui-basic-form>
        <!-- {{$refs}} -->
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import LayoutComponentMixin from '../../../mixins/layout-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';
import ValidateUtil from '../../../utils/validate.util.js'

export default {
    name: "DapUiCollapseLayout",
    model: {
      prop: 'formData',
      event: 'change'
    },
    mixins: [ BasicComponentMixin, LayoutComponentMixin],
    type: 'FORM_LAYOUT',
    computed: {
      validateVal() {
        const validateArray = []
        this.$refs.validateForm.forEach(form => {
          validateArray.push(form.getValidateError());
        })
        return validateArray;
      }
    },
    data() {
      return {
          activeKey: ['0'],
      };
    },
    props: {
      formData: {
        type: Object,
      },
      layoutConfig: {
        type: Object,
        default: {}
      },
      validate: {
        type: Object,
      }
    },
    mounted() {
      this.$watch('validateVal', function (newVal, oldVal) {
        // 添加验证器返回数据
        console.log(ValidateUtil.mergeValidate(newVal));
        this.$emit('validate', ValidateUtil.mergeValidate(newVal));
      }, {
        deep: true
      });
    },
    methods: {
      validateTouch() {
        this.$refs.validateForm.forEach(form => {
          form.validateTouch();
        });
      },
      resetForm() {
        this.$refs.validateForm.forEach(form => {
          form.resetForm();
        });
      },
      openIndex(index) {
        if (this.activeKey.indexOf(index + '') === -1) {
          this.activeKey = push(index + '');
        }
      },
      formEvent(e) {
        this.$emit('formEventEmit', e);
      }
    }
}
</script>

<style src="./index.less" lang="less">
</style>
