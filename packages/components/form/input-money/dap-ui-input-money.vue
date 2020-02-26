<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-26 14:26:06
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-input-money dap-ui-form-item dap-ui-form-input">
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
      <a-input class="money"
        :value="data"
        @change="dataChangeEvent($event)"
        @blur="formatMoney($event)"
        @focus="deleteComma()"
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
  name: "DapUiInputMoney",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  computed: {
  
  },
  props: {
  },
  data() {
    return {
      data: "", // 需求为失焦格式化，所以要用data做中间数据，而不是直接用父组件的value
      flag: false // flag 用于判断是否需要格式化金额，为false时格式化
    }
  },
  watch: {
    value : {
      handler (newValue, oldValue) {
        if (!this.flag) {
          if (parseFloat(newValue) === 0) {
            this.data = "0.00";
          } else {
            if (newValue) {
              this.data = this.formatThousandth(newValue.toString(), 2, true);
            }
            
          }
        }
      },
      immediate:true,
    }
  },
  methods: {
    /**
     * @author lizhihang
     * @param e event
     * @description 值改变事件，只允许输入数字相关
     * @date 2020-2-26
     */
    dataChangeEvent(e) {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/; // 数字正则
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        if (value === '') { // 如果值为空 提示校验文字，不为空时另value为0 关闭校验文字，在失焦事件时将value在复制成正确的值
          this.flag = false;
          this.$formEventEmit('change', undefined);
        } else {
          this.flag = true;
          this.$formEventEmit('change', 0);
        }
        this.data = value; 
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    /**
     * @author lizhihang
     * @param e event
     * @description 失焦事件，改变父组件传来的value值
     * @date 2019-2-26
     */
    formatMoney(e) {
      const { value } = e.target;
      this.flag = false;
      if (!value || value === "-") {
        this.$formEventEmit('change', undefined);
        this.data = "";
      } else if (parseFloat(value) === 0) {
        this.$formEventEmit('change', 0);
        this.data = "0.00"
      } else {
        var formatedMoney = this.formatThousandth(value, 2, true);
        this.data = formatedMoney;
        formatedMoney = formatedMoney.replace(/\,/g, '');
        this.$formEventEmit('change', parseFloat(formatedMoney));
      }
    },
    /**
     * @author lizhihang
     * @description fous事件，去除逗号
     * @date 2020-2-26
     */
    deleteComma() {
      this.data = this.data.replace(/\,/g, '');
    },
    formatThousandth(num, cent, isThousand) {
      const reg = /\d{1,3}(?=(\d{3})+$)/g;
      let result;
      if (num || num === 0) {
        num = num.toString().replace(/$|,/g, "");
        const dotIndex = num.indexOf(".");
        if (dotIndex > -1) {
          let dotLeft = num.substring(0, dotIndex);
          if (isThousand) {
            dotLeft = (dotLeft + "").replace(reg, "$&,");
          }
          let dotRight = num.substring(dotIndex + 1, dotIndex + cent + 1);
          if (dotRight.length < cent) {
            while (dotRight.length < cent) {
              dotRight += "0";
            }
          }
          result = `${dotLeft}.${dotRight}`;
        } else {
          if (isThousand) {
            result = (num + "").replace(reg, "$&,");
          } else {
            result = num;
          }
          if (cent > 0) {
            result += ".";
            for (let i = 0; i < cent; i++) {
              result += "0";
            }
          }
        }
      }
      return result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
