<!--
 * @Author: lizhihang
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: your name
 * @LastEditTime: 2020-03-22 13:19:58
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-upload-attachment dap-ui-form-item">
    <div class="attachment-title">
      <span class="title"> {{label}} </span>
      <a-upload
        :customRequest="customRequest"
        @change="loadSuccess($event)"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        v-if="isShow()"
      >
        <span class="max-upload-size" @click="stopBubble($event)">单个文件大小不超过{{uploadSize}}M</span>
        <a-button v-if="!viewable" type="primary" :loading="showUploadProcess"> <a-icon type="file" /> 
          <span v-if="!showUploadProcess">{{ btnTitle}}</span>
          <span v-if="showUploadProcess">{{ uploadProcess }}%</span> </a-button>
      </a-upload>
    </div>
    
    <dap-ui-table
      :table-base-config="tableBaseConfig"
      :table-data.sync="tableData">
      <template v-slot:operate="{ row, rowIndex }">
        <div class="operator-column">
          <a-icon
            type="download"
            style="color: #1890ff;"
            @click="attachmentDownload(row)"
          />
          <a-icon
            type="close-square"
            style="color: red; margin-left: 5px"
            @click="uploadDelete(row, rowIndex)"
            v-if="isShow() && !viewable"
          />
        </div>
      </template>
    </dap-ui-table>
  </div>
</template>
<script>
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';
import AttachmentComponentMixin from "../../../mixins/attachment-component-mixin.js";

export default {
  name: "DapUiUploadAttachment",
  type: 'FORM_ATTACHMENT',
  mixins: [BasicComponentMixin, AttachmentComponentMixin],
  props: {
    viewable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstGetValue: true, // 第一次获取到value判断 
      uploadProcess: 0,
      showUploadProcess: false,
      tableBaseConfig: {
        size: "small",
        virtualList: false,
        columns: [
          {
            field: "fileName",
            title: "文件名",
            align: "left"
          },
          {
            field: "createName",
            title: "上传人",
            align: "center"
          },
          {
            field: "uploadTime",
            title: "上传时间",
            align: "center"
          },
          {
            title: "操作",
            slotName: "operate",
            align: "center",
            width: "80px"
          }
        ]
      },
    }
  },
  watch: {
    value: {
      handler (newValue, oldValue) {
        // 如果/process/documentDetail返回有值，则调用/process/form/getAttachmentInfo接口获取完整附件信息
        if (this.documentId &&  this.firstGetValue && newValue) {
          this.firstGetValue = false;
          // 发射事件，调用/process/form/getAttachmentInfo接口
          this.$formEventEmit('getAttachment', newValue);
        }
      },
    }
  },
  methods: {
    isShow() {
      if (this.documentId && this.editOnNew) {
        return false;
      } else {
        return true;
      }
    },
    // change方法 上传中、完成、失败都会调用这个函数
    loadSuccess(event) {
      if (event.file.percent > 0) {
        this.uploadProcess = Math.floor(event.file.percent - 1);
        this.showUploadProcess = true;
      }
      const res = event.file.response;
      // 如果有response，则上传完成
      if (res) {
        this.uploadProcess = 100;
        this.showUploadProcess = false;
        this.firstGetValue = false;
        const valueString = this.tableData.map(attr => {
          return attr.fileCode ;
        }).toString();
        this.$formEventEmit('change', valueString);
      }
    },
    stopBubble(e) {
      e.stopPropagation();
    },
    attachmentDownload(row) {
      const link = document.createElement('a') ;
      link.setAttribute('href', row.fileSrc) ;
      const newFileName = row.fileName.slice(0, row.fileName.indexOf('.')) ;
      link.setAttribute('download', newFileName) ;
      link.style.visibility = 'hidden' ;
      document.body.appendChild(link) ;
      link.click() ;
      document.body.removeChild(link) ;
    },
    uploadDelete(row, index) {
      const data = Object.assign({}, row);
      data.index = index;
      this.$formEventEmit('delete', data);
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
