<template>
  <div class="popover-content"
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <template v-for="(section, index) in userInfoArray">
      <div :key="index">
        <div class="section-name" v-if="section.data.length !== 0">{{ section.name }}</div>
        <a-row v-for="user in section.data" :key="user.empId" class="popover-block" @click.native="handleClick(user)">
          <a-col :span="4" class="popover-left">
            <dap-ui-avatar :avatarSize="36" :avatarSrc:="user.icon" :canComputedValue="user.name"></dap-ui-avatar>
          </a-col>
          <a-col :span="20" class="popover-right">
            <div class="popover-row">
              <h5 class="item-name">{{ user.name }}</h5>
              <!-- <p class="item-info">{{ user.phone }}</p> -->
            </div>
            <div class="popover-row" v-if="user.email">
              <p class="item-info">{{ user.email }}</p>
            </div>
          </a-col>
        </a-row>
        <a-empty v-if="userInfoArray.length === 0"></a-empty>
      </div>
    </template>
  </div>
</template>
<script>
import infiniteScroll from "vue-infinite-scroll";

export default {
  name: "PopoverContent",
  directives: {
    infiniteScroll
  },
  props: {
    userInfoArray: {
      type: Array,
      default: []
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  created() {},
  methods: {
    handleInfiniteOnLoad() {
      this.$emit("load-more");
    },
    handleClick(user) {
      console.log(user);
      this.$emit("select-ok", user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./index.less" lang="less"></style>
