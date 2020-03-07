<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 10:37:47
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 11:01:33
 * @Description: file content description
 -->
<template>
  <div class="dap-ui-org-select dap-ui-form-item dap-ui-form-input">
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
      <template v-if="extraProp.mode === 'modal'">
        <div 
          class="display-block" 
          :class="{'display-block-error': validateStatus === 'error'}" 
          tabindex = "0" 
          @click="handleClick"
        >
          <template v-if="extraProp.selectType === 'single'">
            <div class="display-block-placeholder" v-if="extraProp.selectType === 'single' && extraProp.selectedArray.length === 0">
              {{ placeholder }}
            </div>
            <div class="display-block-single" v-if="extraProp.selectedArray[0]">
              <span>{{ extraProp.selectedArray[0].name }}</span>
            </div>
            <div class="display-block-single-icon">
              <a-button shape="circle">
                <a-icon :type="extraProp.selectedArray.length ? 'swap' : 'apartment'"></a-icon>
              </a-button>
            </div>
          </template>
          <template v-if="extraProp.selectType === 'mult'">
            <template v-for="org in calcSelectedArray">
              <a-tag :closable="true" @close="handleClose(org)">{{ org.name }}</a-tag>
            </template>
            <div class="display-block-more-item" v-if="extraProp.selectedArray.length > multCount">
              <a-tooltip :title="'共选: ' + extraProp.selectedArray.length + '组织'">
                <a-button shape="circle">
                  <a-icon type="small-dash"></a-icon>
                </a-button>
              </a-tooltip>
            </div>
            <div class="display-block-mult-add-item">
              <a-button shape="circle" @click="handleOpenModal">
                <a-icon type="plus"></a-icon>
              </a-button>
            </div>
          </template>
        </div>
      </template>
      <template v-if="extraProp.mode === 'cascade'">
        <a-select
          ref="cascadeSelect"
          :value="value"
          @change="$formEventEmit('change', $event)"
          :mode="extraProp.selectType === 'mult' ? 'multiple' : 'default'"
          :maxTagCount="multCount"
          :placeholder="placeholder"
          :disabled="disabled"
          @dropdownVisibleChange="onDropdownVisibleChange"
          @select="handleSelect"
        >
          <template slot="maxTagPlaceholder">
            <div class="display-block-more-item" v-if="extraProp.selectedArray.length > multCount">
              <a-tooltip :title="'共选: ' + extraProp.selectedArray.length + '组织'">
                <a-button shape="circle">
                  <a-icon type="small-dash"></a-icon>
                </a-button>
              </a-tooltip>
            </div>
          </template>
          <template v-for="option in extraProp.options">
            <a-select-option :value="option.code" :key="option.key">{{ option.name }}</a-select-option>
          </template>
        </a-select>
      </template>
    </a-form-item>
  </div>
</template>
<script>
import InputComponentMixin from '../../../mixins/input-component-mixin.js';
import BasicComponentMixin from '../../../mixins/basic-component-mixin.js';

export default {
  name: "DapUiOrgSelect",
  type: 'FORM_INPUT',
  mixins: [InputComponentMixin, BasicComponentMixin],
  components: {},
  props: {
  },
  computed: {
    calcSelectedArray: function() {
      return this.extraProp.selectedArray.slice(0, this.multCount);
    }
  },
  data() {
    return {
      multCount: 3
    }
  },
  mounted() {
    //TODO: 不合适的方案
    setTimeout(() => {
      if (this.extraProp.mode === 'cascade') {
        this.$formEventEmit("query-options")
      }
    }, 300)
  },
  watch: {
    "value": {
      handler(newVal, oldVal) {
        if (newVal && newVal.length !== 0) {
          if (this.extraProp.mode === 'cascade') {
            this.$formEventEmit("query-options")
          } else if (this.extraProp.mode === "modal" && this.extraProp.selectedArray.length === 0) {
            this.$formEventEmit("query-org-info", newVal)
          }
        }
      },
      immediate: true
    },
    "extraProp.options": {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          // if (this.extraProp.selectType === "single") {
          //   this.selectedCodeArray = this.value
          // } else if (this.extraProp.selectType === "mult") {
          //   this.selectedCodeArray = this.value instanceof Array ? this.value : [this.value]
          // }
        }
      }
    },
    "extraProp.selectedArray": {
      handler(newVal, oldVal) {
        if (newVal.length > 0 && this.extraProp.mode === "modal") {
          console.log(newVal);
          this.emitValueChange()
        }
      }
    }
  },
  created() {},
  methods: {
    onDropdownVisibleChange(visible) {
      if (visible) {
        debugger
        this.$formEventEmit("query-options")
      }
    },
    handleSelect(value) {
      const item = this.extraProp.options.find(item => item.code === value)
      if (value && item) {
        if (this.extraProp.selectType === "single") {
          this.extraProp.selectedArray.pop()
        }
        this.extraProp.selectedArray.push(item)
      }
      if (this.extraProp.selectedArray.length > this.multCount) {
        this.$nextTick(() => {
          let nodes = this.$refs.cascadeSelect.$el.querySelectorAll(".ant-select-selection__choice")
          let lastNode = nodes[nodes.length - 1]
          lastNode.style.backgroundColor = 'transparent'
          lastNode.style.border = 0
          lastNode.style.padding = 0
        })
      }
    },
    handleClick() {
      if (this.extraProp.selectType === "single" && this.extraProp.mode === "modal") {
        this.$emit("open-modal")
      }
    },
    handleClose(org) {
      const index = this.extraProp.selectedArray.findIndex(_org => _org.code === org.code)
      if (index !== -1) {
        this.extraProp.selectedArray.splice(index, 1)
        this.emitValueChange()
      }
    },
    handleOpenModal() {
      this.$emit("open-modal")
    },
    emitValueChange() {
      if (this.extraProp.selectType === "single") {
        this.$formEventEmit("change", this.extraProp.selectedArray.map(org => org.code)[0])
      } else if (this.extraProp.selectType === "mult") {
        this.$formEventEmit("change", this.extraProp.selectedArray.map(org => org.code))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less">
</style>
