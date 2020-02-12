/*
 * @Author: DevinShi
 * @Date: 2020-02-06 06:26:40
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-11 06:32:40
 * @Description: file content description
 */
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
  }
  
declare module "*";

declare module 'vue/types/vue' {
  interface Vue {
    $request: any
  }
}