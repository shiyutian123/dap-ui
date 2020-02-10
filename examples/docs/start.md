<!--
 * @Author: Devin Shi
 * @Email: yutian.shi@definesys.com
 * @Date: 2019-11-01 11:28:23
 * @LastEditTime: 2020-02-06 12:19:05
 * @LastEditors: DevinShi
 * @Description: 
 -->
# 快速上手
<!-- {.md} -->

----
<!-- {.md} -->

## 安装
<!-- {.md} -->

```
npm install dap-vue-ui --save
```
<!-- {.md} -->

## 全局组件使用
<!-- {.md} -->

```js
import DapUi from 'dap-ui' // 引入组件库
```
<!-- {.md} -->

引入<!-- {.md} -->布局样式

```js
import 'dap-ui/lib/dap-ui.css' // px单位，适用于pc端布局
```
最后，全局使用组件库<!-- {.md} -->
```js
Vue.use(DapUi)
```
<!-- {.md} -->

## 单个组件按需使用
<!-- {.md} -->

可以局部注册所需的组件，适用于与其他框架组合使用的场景
<!-- {.md} -->

```js

import { DapUiButton } from 'DapUi'

Vue.use(DapUiButton)

```
<!-- {.md} -->

在模板中，用<!-- {.md} --> `<dap-ui-button></dap-ui-button>` 自定义标签的方式使用组件

```html
<template>
  <div>
    <dap-ui-button>这是一个基础卡片</dap-ui-button>
  </div>
</template>
```
<!-- {.md} -->


