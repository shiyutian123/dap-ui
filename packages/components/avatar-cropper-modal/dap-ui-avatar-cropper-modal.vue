<template>
  <div class="avatar-cropper-modal">
    <input type="file" :id="cropperId" accept="image/png, image/jpeg, image/jpg" @change="select($event)" 
      style="display: none;position: absolute; clip: rect(0px, 0px, 0px, 0px); cursor: pointer;">
    <dap-ui-modal v-bind="modalConfig" @ok="handleOk" @cancel="handleCancel">
      <div class="tailoring-content-two">
        <div class="container tailoring-box-parcel">
          <img
            :ref="srcId" 
            src="" 
            style="width: 100%;height: auto" 
            accept=".jpg, .jpeg, .png"
          >
        </div>
        <div class="preview-box-parcel" v-if="showPreviewImg">
          <p>图片预览：</p>
          <div>
            <div class="square previewImg"></div>
            <div class="circular previewImg"></div>
          </div>
        </div>
      </div>
    </dap-ui-modal>
  </div>
</template>

<script>

var Cropper;

export default {
  name: "DapUiAvatarCropperModal",
  props: {
    // input file id 与label的for相同
    cropperId: {
      type: String,
      default: "uploads"
    },
    baseDomain: {},
    showPreviewImg: {
      type: Boolean,
      default: true
    },
    isCropperFree: {
      type: Boolean,
      default: false
    },
    cropperWidth: {
      type: Number,
      default: 1
    },
    cropperHeight: {
      type: Number,
      default: 1
    },
    imgSize: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      modalConfig: {
        visible: false,
        title: "裁剪图片",
        size: "other",
        modalClass: "dap-ui-avatar-cropper-modal",
        okText: "确定裁剪",
        width: 850,
        confirmLoading: false
      }, // 弹窗组件配置
      srcId: new Date().getTime(), // img标签的id，用于获取dom节点
      fr: {}, // input file 的FileReader实例
      file: {}, // input file 的FileReader实例 的file
      image: {}, // img标签的dom
      cropper: {}, // cropper实例
      inputFile: {} // input file 的dom
    };
  },
  watch: {
    showPreviewImg: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.modalConfig.width = 850;
        } else {
          this.modalConfig.width = 570;
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated input file 选择文件回调事件
     */
    select($event) {
      this.fr = new FileReader();
      this.file = $event.target.files[0];
      if (!$event.target || !$event.target.files[0]) {
        return;
      }
      if (this.checkImgFormat(this.file)) {
        if (this.checkImgSize(this.file)) {
          this.fr.readAsDataURL(this.file);
          this.fr.onload = () => {
            this.loadResources({
              domain: this.baseDomain, 
              callback: () => {
                this.modalConfig.visible = true;
                const _window = window;
                Cropper = _window.Cropper;
                setTimeout(()=> {
                  this.iniCropper();
                }, 10);
              }
            });
          };
        }
      }
    },
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 初始化Cropper
     */
    iniCropper() {
      this.image = this.$refs[this.srcId];
      this.image.setAttribute("src", this.fr.result);
      if (this.isCropperFree) {
        this.cropper = new Cropper(this.image, {
          preview: ".previewImg", // 预览视图
          cropBoxMovable: true, // 允许拖动裁剪框
          dragMode: "crop", // 可以拖动图片
          cropBoxResizable: true, // 是否通过拖动来调整剪裁框的大小
          viewMode: 1,
          crop(event) {},
        });
      } else {
        this.cropper = new Cropper(this.image, {
          aspectRatio: this.cropperWidth / this.cropperHeight,
          preview: ".previewImg", // 预览视图
          cropBoxMovable: false, // 不允许拖动裁剪框
          dragMode: "move", // 可以拖动图片
          cropBoxResizable: false,
          viewMode: 1,
          crop(event) {},
        });
      }
    },
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 加载Cropper插件
     */
    loadResources({ domain, callback }) {
      // this.modalConfig.visible = true;
      this.$asyncLoadResource(
        `${domain}/static/cropperjs/dist/cropper.min.css`,
        "link",
        "cropper-css"
      ).then();
      this.$asyncLoadResource(
        `${domain}/static/cropperjs/dist/cropper.min.js`,
        "script",
        "cropper-js"
      ).then(() => {
        callback && callback();
      });
    },
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 取消裁剪
     */
    handleCancel() {
      this.modalConfig.visible = false;
      this.inputFile.value = ""; // 将input file标签设为空 防止不触发input的change方法
      this.image["setAttribute"]("", ""); // // 将img标签设为空 防止下次裁剪img会刷新
      this.cropper.destroy();
    },
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 确认裁剪
     */
    handleOk() {
      // this.modalConfig.visible = false;
      const filePath = this.file.name;
      const fileEnd = filePath.substring(filePath.indexOf("."));
      const dataURL = this.image.cropper["getCroppedCanvas"]("", { width: 100, height: 100 });
      const avatarSrc = dataURL.toDataURL();
      const file = this.dataURLtoBlob(avatarSrc);
      const event = {
        url: avatarSrc,
        file: file
      };
      this.$emit("cropperOk", event);
    },
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 设置弹窗确定按钮loading
     */
    setOkBtnLoading() {
      this.modalConfig.confirmLoading = true;
    },

    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 取消设置弹窗确定按钮loading
     */
    setOkBtnNotLoading() {
      this.modalConfig.confirmLoading = false;
    },

    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 检查图片大小
     */
    checkImgSize(file) {
      var fileSize = 0;
      const fileMaxSize = 1024 * this.imgSize; // 2M
      if (file) {
        fileSize = file.size;
        const size = fileSize / 1024;
        if (size > fileMaxSize) {
          this.$notification.error({message: "错误", description: "图片大于" + this.imgSize + "M"});
          this.inputFile.value = ""; // 将input file标签设为空 防止不触发input的change方法
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },

    /**
     * @author lizhihang
     * @date 2020-3-9
     * @deprecated 检查图片格式
     */
    checkImgFormat(file) {
      const fileTypes = [".jpg", ".png", ".jpeg", ".PNG", ".JPG", ".JPEG"];
      const filePath = file.name;
      var isNext = false;
      if (filePath) {
        const fileEnd = filePath.substring(filePath.lastIndexOf("."));
        for (var i = 0; i < fileTypes.length; i++) {
          if (fileTypes[i] === fileEnd) {
            isNext = true;
            break;
          }
        }
        if (!isNext) {
          this.$notification.error({
            message: "错误", 
            description: "请正确选择图片格式(jpg、png、jpeg)"
          });
          this.inputFile.value = ""; // 将input file标签设为空 防止不触发input的change方法
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    /**
     * @author lizhihang
     * @date 2020-3-9
     * @description 将base64格式图片转换为文件形式
     * @param dataurl 地址
     */
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      var n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  },
  mounted() {
    this.inputFile = document.getElementById(this.cropperId);
  }
};
</script>

<style scoped lang="less" src="./index.less"></style>
