/*
 * @Author: DevinShi
 * @Date: 2020-02-22 17:49:19
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-22 21:07:48
 * @Description: file content description
 */
import Storage from 'vue-ls';

const StoragePlugin = {
  install (Vue, options) {
    const opts = {
      namespace: 'vuejs__', // key prefix
      name: 'ls', // name variable Vue.[ls] or this.[$ls],
      storage: 'local', // storage name session, local, memory
    };
    Vue.use(Storage, opts);
  }
}

export default StoragePlugin