/*
 * @Author: Trevor
 * @Email: wei.tang@definesys.com
 * @Date: 2020-03-16 10:47:19
 * @LastEditTime: 2020-03-16 10:53:12
 * @LastEditors: your name
 * @Description: file content
 */
const VueBusPlugin = {
  install(Vue, opts) {
    const Bus = new Vue({
      methods: {
        emit(event, ...args) {
          this.$emit(event, ...args);
        },
        on(event, callback) {
          this.$on(event, callback);
        },
        off(event, callback) {
          this.$off(event, callback);
        }
      }
    });
    Vue.prototype.$bus = Bus;
  }
};

export default VueBusPlugin;
