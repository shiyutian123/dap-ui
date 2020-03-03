/*
 * @Author: DevinShi
 * @Date: 2020-02-22 17:49:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-27 14:26:27
 * @Description: file content description
 */
import Moment from 'moment';

const MomentPlugin = {
  install (Vue, options) {
    Vue.use(Moment)
  }
}

export default MomentPlugin