/*
 * @Author: DevinShi
 * @Date: 2020-02-09 16:20:08
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-09 16:20:09
 * @Description: file content description
 */
import lodash from 'lodash'

const genericInstall = (Vue) => {
  Vue._ = lodash
  Object.defineProperties(Vue.prototype, {
    _: { get() { return lodash } }
  })
}

const LodashPlugin = {
  install (Vue, options) {
    if (options && options.name) {
      Vue['_' + options.name] = lodash
      Object.defineProperties(Vue.prototype, {
        [options.name]: { get() { return lodash } }
      })
    }
    genericInstall(Vue)
  }
}

export default LodashPlugin
