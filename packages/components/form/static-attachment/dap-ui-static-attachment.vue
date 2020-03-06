<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-17 08:47:50
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-static-attachment dap-ui-form-item">
    <div class=" design-static-file">
      <p>附件下载</p>
      <div v-for=" (item, index) in extraProp.fileArray">
        <div class="fileText">
          <div style="text-align: center"> <a-icon type="file"></a-icon> </div>
          <div class="design-static-input-upload-span" style="text-align:left; margin-right: 10px;">
            <span>{{item.fileName}}</span> </div>
        </div>

        <div>
          <a-icon type="download" @click="attachmentDownload(item.src,item.FileName)"></a-icon>
          <!-- <i nz-icon [type]="'delete'" (click)="delete(i.attachmentCode, designModel?.fileArray, m)"></i> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiStaticAttachment",
  type: 'FORM_STATIC_RENDER',
  mixins: [BasicComponentMixin],
  props: {
  },
  methods: {
    attachmentDownload(fileSrc, fileName) {
      window.open(fileSrc);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less" scoped>
</style>
