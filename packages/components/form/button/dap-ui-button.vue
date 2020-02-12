<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 11:36:02
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-button">
    <a-button type="primary">Primary</a-button>
    <h1 >{{ msg }}</h1>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "DapUiButton",
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
