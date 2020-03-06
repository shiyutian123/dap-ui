<template>
  <div class="avatar">
    <a-avatar v-if="avatarSrc" :src="avatarSrc" :size="avatarSize"></a-avatar>
    <div
      v-else
      class="avatar-default"
      :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
      :class="activeClass"
    >
      <span
        class="avatar-default-text"
        :style="{ 'font-size': calcFontSize + 'px' }"
      >
        {{ defaultAvatarText }}
      </span>
    </div>
  </div>
</template>

<script >
export default {
  name: 'DapUiAvatar',
  props: {
    avatarSize: {
      type: Number,
      default: 25
    },
    avatarSrc: {
      type: String
    },
    canComputedValue: {
      type: String
    }
  },
  data() {
    return {
      computedValue: -1,
      defaultAvatarText: ""
    }
  },
  computed: {
    activeClass: function() {
      return {
        "avatar-red": this.computedValue === 1,
        "avatar-volcano": this.computedValue === 2,
        "avatar-orange": this.computedValue === 3,
        "avatar-gold": this.computedValue === 4,
        "avatar-yellow": this.computedValue === 5,
        "avatar-lime": this.computedValue === 6,
        "avatar-green": this.computedValue === 7,
        "avatar-cyan": this.computedValue === 8,
        "avatar-blue": this.computedValue === 9,
        "avatar-geekblue": this.computedValue === 10,
        "avatar-purple": this.computedValue === 11,
        "avatar-magenta": this.computedValue === 12
      };
    },
    calcFontSize: function() {
      const fontSize = Math.floor(this.avatarSize / 3);
      return fontSize > 12 ? fontSize : 12;
    }
  },
  methods: {
    calcDefaultAvatarInfo(newVal, oldVal) {
      this.defaultAvatarText = newVal ? newVal.slice(-2) : "";
      let sum = 0;
      for (let i = 0; i < newVal.length; i++) {
        sum += newVal.charAt(i).charCodeAt();
      }
      this.computedValue = (sum % 12) + 1;
    }
  },
  created() {
    this.calcDefaultAvatarInfo(this.canComputedValue);
  }
}
</script>

<style scoped lang="less" src="./index.less"></style>
