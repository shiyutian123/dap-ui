<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 11:01:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-person-select dap-ui-form-item dap-ui-form-input">
    <a-form-item
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :has-feedback="hasFeedback"
      :validate-status="validateStatus"
      :extra="extra"
      :required="required"
      :colon="colon"
      :help="help">
      <template v-slot:label>
        <span :style="{color: labelColor}">{{label}}</span>
      </template>
      <div 
        ref="displayBlock" 
        class="display-block" 
        :class="{'display-block-error': validateStatus === 'error'}" 
        tabindex = "0" 
        @click="handleClick"
      >
        <template v-for="user in calcSelectedArray">
          <dap-ui-person :info="user" :key="user.empId">
            <template slot="popover-content">
              <div class="person-popover-content" v-if="!disabled">
                <span class="remove-item" @click="removeUser(user)">移除人员</span>
              </div>
            </template>
          </dap-ui-person>
        </template>
        <div class="display-block-placeholder" v-if="extraProp.selectType === 'single' && extraProp.selectedArray.length === 0">
          {{ placeholder }}
        </div>
        <a-popover trigger="click" placement="bottomRight" v-model="isShowPopover" @visibleChange="onVisibleChange">
          <template v-if="extraProp.selectType === 'single'">
            <div class="display-block-single-icon">
              <a-button shape="circle">
                <a-icon :type="extraProp.selectedArray.length ? 'swap' : 'user'"></a-icon>
              </a-button>
            </div>
          </template>
          <template v-if="extraProp.selectType === 'mult'">
            <div class="display-block-more-item" v-if="extraProp.selectedArray.length > multCount">
              <a-tooltip :title="'共选: ' + extraProp.selectedArray.length + '人'">
                <a-button shape="circle">
                  <a-icon type="small-dash"></a-icon>
                </a-button>
              </a-tooltip>
            </div>
            <div class="display-block-mult-add-item" v-if="!disabled">
              <a-button shape="circle">
                <a-icon type="plus"></a-icon>
              </a-button>
            </div>
          </template>
          <template slot="title">
            <popover-title
              @open-modal="onOpenModal"
              @keyword-change="onKeywordChange"
            ></popover-title>
          </template>
          <template slot="content">
            <popover-content 
              :userInfoArray="extraProp.userInfoArray" 
              :busy="extraProp.busy" 
              @load-more="onLoadMore"
              @select-ok="onSelectOk"
            ></popover-content>
          </template>
        </a-popover>
      </div>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';
import PopoverTitle from './person-select-popover/popover-title.vue';
import PopoverContent from './person-select-popover/popover-content.vue';

export default {
  name: "DapUiPersonSelect",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  components: {
    "popover-title": PopoverTitle,
    "popover-content": PopoverContent
  },
  props: {
  },
  computed: {
    calcSelectedArray: function() {
      return this.extraProp.selectedArray.slice(0, this.multCount);
    }
  },
  data() {
    return {
      isShowPopover: false,
      params: {
        keyWord: "",
        firstLetter: "",
        page: 1,
        pageSize: 10
      },
      multCount: 3
    }
  },
  watch: {
    "value": {
      handler(newVal, oldVal) {
        if (newVal && this.extraProp.selectedArray.length === 0) {
          this.$formEventEmit("query-user-info", this.value);
        } else if (!newVal) {
          this.extraProp.selectedArray = []
        }
      },
      immediate: true
    },
    "extraProp.selectedArray": {
      handler(newVal, oldVal) {
        this.emitValueChange()
      }
    },
    "extraProp.userInfoArray": {
      handler(newVal, oldVal) {
        console.log(newVal)
      }
    }
  },
  mounted() {
    console.log(this.extraProp);
    // TODO 不合适的方案
    // 表格宽度计算在这之后
    setTimeout(() => {
      this.calcMultCount();
    }, 100);
  },
  methods: {
    removeUser(user) {
      const index = this.extraProp.selectedArray.findIndex(_user => _user.empId === user.empId)
      if (index !== -1) {
        this.extraProp.selectedArray.splice(index, 1)
        this.emitValueChange()
      }
    },
    emitValueChange() {
      if (this.extraProp.selectType === "single") {
        this.$formEventEmit("change", this.extraProp.selectedArray.map(user => user.empId)[0] || "")
      } else if (this.extraProp.selectType === "mult") {
        this.$formEventEmit("change", this.extraProp.selectedArray.map(user => user.empId))
      }
    },
    handleClick() {
      if (this.extraProp.selectType === "single" && !this.isShowPopover) {
        this.isShowPopover = true;
        this.onVisibleChange(true);
      }
    },
    onVisibleChange(visible) {
      if (visible) {
        this.params.keyWord = "";
        this.params.page = 1;
        this.$formEventEmit("query-userInfo-array", this.params);
      }
    },
    onLoadMore() {
      const section = this.extraProp.userInfoArray.find(item => item.data.length < item.total)
      if (section) {
        this.params.page ++;
        this.$formEventEmit("load-more", this.params);
      } else {
        this.params.page = 1;
      }
    },
    onSelectOk(user) {
      this.isShowPopover = false;
      if (this.extraProp.selectType === "single") {
        this.extraProp.selectedArray.pop()
      }
      this.extraProp.selectedArray.push(user);
      this.emitValueChange()
    },
    onOpenModal() {
      this.isShowPopover = false;
      this.$emit("open-modal")
    },
    onKeywordChange(value) {
      this.params.keyWord = value;
      this.params.page = 1;
      this.$formEventEmit("query-userInfo-array", this.params);
    },
    calcMultCount() {
      this.$nextTick(() => {
        // console.log(this.$refs.displayBlock.clientWidth)
        this.multCount = Math.ceil((this.$refs.displayBlock.clientWidth - 100) / 120)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
