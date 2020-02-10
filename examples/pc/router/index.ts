/*
 * @Author: DevinShi
 * @Date: 2020-02-06 08:01:36
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-06 09:47:28
 * @Description: file content description
 */
import Vue from 'vue'
import Router from 'vue-router'
import navConf from '../../nav.config.json'

Vue.use(Router)

let routes: any[] = []

Object.keys(navConf).forEach(header => {
  routes = routes.concat((navConf as any)[header])
})

let addComponent = (router: any) => {
  router.forEach((route: any) => {
    if (route.items) {
      addComponent(route.items)
      routes = routes.concat(route.items)
    } else {
      if (route.name === 'site-index') {
        route.component = (r: any) =>
          require.ensure([], () => r(require(`../../docs/introduce.md`)))
      } else {
        route.component = (r: any) =>
          require.ensure([], () => r(require(`../../docs/${route.name}.md`)))
      }
    }
  })
}
addComponent(routes)
let availableRoutes = routes.filter(item => item.path)
export default new Router({
  routes: availableRoutes
})