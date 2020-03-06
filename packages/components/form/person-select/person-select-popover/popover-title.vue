<template>
  <a-row class="popover-title">
    <a-col :span="20" class="popover-left">
      <a-input type="text" placeholder="请输入用户账号或姓名" size="large" v-model="value" @change="onChange" />
    </a-col>
    <a-col :span="4" class="popover-right" @click="handleClick">
      <a-button type="default">
        <a-icon type="team"></a-icon>
      </a-button>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: "PopoverTitle",
  props: {},
  watch: {},
  data() {
    return {
      value: "",
      debounceEmit: null
    }
  },
  created() {
    this.debounceEmit = this.debounce(this.$emit, 300);
  },
  methods: {
    debounce(func, wait, immediate) {
      var timeout, result;
      var debounced = function () {
          var context = this;
          var args = arguments;

          if (timeout) clearTimeout(timeout);
          if (immediate) {
              // 如果已经执行过，不再执行
              var callNow = !timeout;
              timeout = setTimeout(function(){
                  timeout = null;
              }, wait)
              if (callNow) result = func.apply(context, args)
          }
          else {
              timeout = setTimeout(function(){
                  func.apply(context, args)
              }, wait);
          }
          return result;
      };

      debounced.cancel = function() {
          clearTimeout(timeout);
          timeout = null;
      };

      return debounced;
    },
    handleClick() {
      this.$emit("open-modal")
    },
    onChange(event) {
      this.debounceEmit("keyword-change", this.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less"></style>
