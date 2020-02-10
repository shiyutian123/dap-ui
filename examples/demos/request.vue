<!--
 * @Author: DevinShi
 * @Date: 2020-02-06 08:13:20
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-09 16:00:55
 * @Description: file content description
 -->
<style lang="less">
</style>
<script>
const QUERY_TODO_LIST = {
    url: '/process/taskQuery/queryPageToDoList',
    method: 'get',
    data: {}
}
export default {
  name: 'request-demo',
  
  data: function() {
      return {
          todoList: []
      }
  },
  
  created() {
    this.$request(QUERY_TODO_LIST).aysncThen(res => {
        // 返回正常网络请求
        this.todoList = res.data ;
    }, failRes => {
        // 业务请求错误
    }).aysncErrorCatch(error => {
        // 网络请求非业务报错
        console.error(error)
    })
  }
}
</script>

<template>
  <div class="demo-block">
    {{todoList}}
  </div>
</template>