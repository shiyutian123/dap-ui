<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-07 01:55:23
 * @Description: file content description
 -->
<template>
  <div class="sdf-ui-button">
    <a-button type="primary">Primary</a-button>
    <h1 >{{ msg }}</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import { Input } from 'ant-design-vue';
Vue.use(Input)

export default {
  name: "SdfUiButton",
  props: {
    msg: {
      type: String,
      required: true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
