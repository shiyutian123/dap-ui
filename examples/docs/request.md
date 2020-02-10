<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 09:53:06
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-09 16:02:32
 * @Description: file content description
 -->
# Request 网络请求 

<!-- {.md} -->

---

<!-- {.md} -->

## 基础用法

<!-- {.md} -->


用来<!-- {.md} --> 测试组件的内容 <!-- {.md} -->。

<request-demo></request-demo>

::: demo

```
    this.$request(QUERY_TODO_LIST).aysncThen(res => {
        // 返回正常网络请求
        this.todoList = res.data ;
    }, failRes => {
        // 业务请求错误
    }).aysncErrorCatch(error => {
        // 网络请求非业务报错
        console.error(error)
    })
```

:::

## Attributes

<!-- {.md} -->

| 参数    | 说明        | 类型     | 可选值    默认值    |
| -------| -----------| -------- | ------ | --------- |
| msg    |  描述       | String   |        |           | 
