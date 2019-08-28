<template>
  <!-- <div>
        <com-a>你好呀</com-a>
        <hr>
        <com-a>你好</com-a>
  </div>-->
  <!-- 具名插槽 -->
  <div>
    <com-a>
        <!-- 新语法v-slot  -->
         <!-- <template v-slot:content="scope">内容1 {{scope.msg}}</template> -->
        <template v-slot:c="scope">
            {{scope.msg}}
        </template>
        <!-- <div slot="c" slot-scope="scope">我是韩信 {{scope.msg}}</div> -->
        <div slot="d">我是李白</div>
    </com-a>
    <hr>
    <com-a>你好</com-a>
  </div>
</template>

<script>
import comA from './com-A'
export default {
  components: { comA }
}
</script>

<style lang="less" scoped>
</style>
