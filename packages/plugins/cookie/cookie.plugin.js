/*
 * @Author: DevinShi
 * @Date: 2020-02-22 17:49:05
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-22 21:07:32
 * @Description: file content description
 */
import VueCookies from 'vue-cookies'

const CookiePlugin = {
  install (Vue, options) {
    Vue.use(VueCookies)
  }
}

export default CookiePlugin