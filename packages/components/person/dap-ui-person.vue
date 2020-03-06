<template>
  <div class="person">
    <a-popover>
      <div class="perosn-info">
        <dap-ui-avatar
          :avatarSize="24"
          :avatarSrc="info.icon"
          :canComputedValue="info.name"
        ></dap-ui-avatar>
        <span class="user-name">{{ info.name }}</span>
      </div>
      <template slot="title">
        <a-row class="avatar-popover-title">
          <a-col :span="6" class="popover-left">
            <div class="item-avatar">
              <dap-ui-avatar
                :avatarSize="48"
                :avatarSrc="info.icon"
                :canComputedValue="info.name"
              ></dap-ui-avatar>
            </div>
          </a-col>
          <a-col :span="18" class="popover-right">
            <div class="item-info">
              <h5 class="item-name">{{ info.name }}</h5>
              <p>{{ info.empId }}</p>
            </div>
            <p class="item-info">{{ info.phone }}</p>
            <p class="item-info">{{ info.email }}</p>
          </a-col>
        </a-row>
      </template>
      <template slot="content">
        <slot name="popover-content"></slot>
      </template>
    </a-popover>
  </div>
</template>

<script>

export default {
  name: "DapUiPerson",
  props: {
    info: {
      type: Object,
      required: true,
      default: {}
    }
  }
}
</script>

<style lang="less">
.ant-popover-title,
.ant-popover-inner-content {
  padding: 0 !important;
}
</style>

<style lang="less" scoped src="./index.less"></style> 
