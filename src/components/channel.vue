
<template>
<!-- /自己封装的频道组件、 -->
    <!-- :value 是给标签el-select 动态绑定数据 -->
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <!-- 遍历channelOptions -->
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值给channelOptions
      this.channelOptions = data.channels
    },
    changeChannel (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
