<template>
    <!-- 默认插槽 -->
    <!-- <div>
        <div>header</div>
        <div>
            <slot>默认内容</slot>
        </div>
        <div>footer</div>
    </div> -->
    <!-- 具名插槽 就是指给slot加name 然后调用时候加slot属性 -->
    <div>
        <div>header</div>
        <div>
            <!-- 作用域插槽 -->
            <slot name="c" :msg="msg">内容1</slot>
        </div>
        <div>
            <slot name="d"></slot>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '我是组件A的内容'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
