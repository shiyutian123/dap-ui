<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-10 19:04:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-button">
    <a-button type="primary" @click="handlerClick" @focus="handlerFocus" :style="{ 'background-color': extraProp.fontColor, 'border': 0 }">{{ label }}</a-button>
    <!-- <h1 >{{ msg }}</h1> -->
  </div>
</template>

<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

import Vue from 'vue'

export default {
  name: "DapUiButton",
  type: 'FORM_INPUT',
  mixins: [BasicComponentMixin],
  props: {
  },
  methods: {
    handlerClick(e) {
      this.$formEventEmit('click', e);
    },
    handlerFocus(e) {
      this.$formEventEmit('focus', e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
