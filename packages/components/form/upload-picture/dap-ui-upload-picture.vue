<!--
 * @Author: lizhihang
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: lizhihang
 * @LastEditTime: 2020-02-17 08:47:50
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-upload-picture dap-ui-form-item">
    <a-upload
      listType="picture"
      :fileList="fileList"
      :customRequest="customRequest"
      @change="loadSuccess($event)"
      :remove="remove"
    >
      <a-button type="primary"> <a-icon type="picture" /> {{btnTitle}} </a-button>
    </a-upload>
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';
import AttachmentComponentMixin from "../../../mixins/attachment-component-mixin.js";

export default {
  name: "DapUiUploadPicture",
  type: 'FORM_ATTACHMENT',
  mixins: [BasicComponentMixin, AttachmentComponentMixin],
  props: {
  },
  data() {
    return {
      fileList: [], // 文件列表，形式为[{uid:"123",name:"1.jpg",url:"http://123388*****"}]
      firstGetValue: true, // 第一次获取到value判断 
    }
  },
  watch: {
    // fileCodeList值改变 为监听删除成功事件和进入明细从接口/process/form/getAttachmentInfo取到值事件
    fileCodeList : {
      handler (newValue, oldValue) {
        if (newValue['type'] === 'delete') {
          // 删除事件
          this.fileList = this.fileList.filter(item => item.uid !== newValue['code']);
          const valueString = this.fileList.map(attr => {
            return attr.uid ;
          }).toString();
          this.$formEventEmit('change', valueString);
        } else if (newValue['type'] === 'getValue') {
          // 进入明细从/process/form/getAttachmentInfo接口取到值事件
          this.fileList = newValue['code'];
        }
      },
      // immediate:true,
      deep: true
    },
    // fileCodeList值改变
    value: {
      handler (newValue, oldValue) {
        // 如果/process/documentDetail返回有值，则调用/process/form/getAttachmentInfo接口获取完整附件信息
        if (this.documentId && this.firstGetValue && newValue) {
          this.firstGetValue = false;
          // 发射事件，调用/process/form/getAttachmentInfo接口
          this.$formEventEmit('getAttachment', newValue);
        }
      },
    }
  },
  methods: {
    // change方法 上传中、完成、失败都会调用这个函数
    loadSuccess(event) {
      this.fileList=event.fileList;
      const res = event.file.response;
      // 如果有response，则上传完成
      if (res) {
        // 添加操作
        const btt = {};
        btt.uid = res.data.attachmentCode ;
        // btt.name = res.data.attachmentName.slice(res.data.attachmentCode.length);
        btt.name = res.data.attachmentName;
        btt.url = res.data.attachmentUrl ;
        this.fileList.splice(this.fileList.length - 1, 1) ;
        this.fileList.push(btt);
        this.firstGetValue = false;
        const valueString = this.fileList.map(attr => {
          return attr.uid ;
        }).toString();
        this.$formEventEmit('change', valueString);
      }
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
