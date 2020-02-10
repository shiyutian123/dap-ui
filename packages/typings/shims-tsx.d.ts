/*
 * @Author: DevinShi
 * @Date: 2020-02-06 06:24:27
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-06 06:24:27
 * @Description: file content description
 */
import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
