<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-22 13:13:21
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-editor dap-ui-form-item dap-ui-form-input">
    <div class="app-design-editor" :style="{'border-color' : validateStatus === 'error' ? '#f5222d' : '#e8e8e8'}">
      <header class="app-design-editor-header"><label v-if="required" class="ant-form-item-required"></label>{{ label }}</header>
      <div v-if="viewable" class="ant-input no-border text-ellipsis" :html="value" style="height: height: 240px; white-space: normal; overflow: auto;"></div>
      <article v-else class="app-design-editor-article">
          <div :class="{'editor': !disabled, 'editor-disabled': disabled}" :ref="vmData.editorId"></div>
      </article> 
    </div>
    <div class="editor-error" v-if="validateStatus === 'error'">{{help}}</div>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';
import WangEditor from 'wangeditor';

export default {
  name: "DapUiEditor",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  props: {
  },
  data() {
    return {
      vmData: {
        editorId: new Date().getTime(),
        editorInstance: undefined
      },
    }
  },
  watch: {
    value:{ 
      handler(newValue, oldValue) {
        this.vmData.editorInstance.txt.html(newValue);
      },
    }
  },
  mounted() {
    this.vmData.editorInstance = new WangEditor(this.$refs[this.vmData.editorId]);
    this.vmData.editorInstance.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ];
    this.vmData.editorInstance.customConfig.uploadImgShowBase64 = true;
    this.vmData.editorInstance.customConfig.onchange = (html => {
        if (html === "<p><br></p>") {
          this.$formEventEmit('change', "");
        } else {
          this.$formEventEmit('change', html);
        }
    });
    this.vmData.editorInstance.customConfig.onblur = (html => {
        console.log("blur" ,html);
    });
    this.vmData.editorInstance.customConfig.customUploadImg = this.extraProp.customUploadImg;
    this.vmData.editorInstance.create();
    if (this.disabled) {
      this.vmData.editorInstance.$textElem.attr('contenteditable', false);
    } else {
      this.vmData.editorInstance.$textElem.attr('contenteditable', true);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
