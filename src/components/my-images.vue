<template>
  <div class="img-uploader">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <!-- 没有传入图片的时候  使用默认导入的图片 -->
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group @change="toggleCollect" size="small" v-model="reqParams.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:item.url===selectedImageUrl}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上组组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
// 导入一张默认图
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-images',
  // v-model 传入的地址
  props: ['value'],
  data () {
    return {
      // 控制对话框隐藏
      dialogVisible: false,
      //   当前激活选项卡的name属性 frlst second
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      //   图片列表数据
      images: [],
      //   图片总数
      total: 0,
      // 检录当前选中的图片地址
      selectedImageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 上传成功后的预览地址
      uploadImageUrl: null,
      // 图片按钮的src
      defaultImage
    }
  },
  methods: {
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      // 打开对话框重置数据
      this.activeName = 'image'
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      // 对话框显示
      this.dialogVisible = true
      this.getImages()
    },
    // 切换全部与收藏
    toggleCollect () {
      // 切换时候都是第一页
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      //   总条数
      this.total = data.total_count
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 上传成功
    handleSuccess (res) {
      // 成功提示
      this.$message.success('上传图片成功')
      // 预览即可
      this.uploadImageUrl = res.data.url
    },
    // 确定图片
    confirmImage () {
      let src = null
      if (this.activeName === 'image') {
        // 使用 electedImageUrl
        if (!this.selectedImageUrl) return this.$message.info('请选择素材图片')
        src = this.selectedImageUrl
      } else {
        // 使用 uploadImageUrl
        if (!this.uploadImageUrl) return this.$message.info('请选择上传图片')
        src = this.uploadImageUrl
      }
      // 图片按钮的src 等于选中后的src
      // this.confirmSrc = src
      // 确定的地址交给父组件
      this.$emit('input', src)
      // 转换成功后 关闭对话框
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-uploader{
  display: inline-block;
  margin-right: 20px;
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  margin-top: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;
    &.selected {
      &::after {
        // .img_item.selected::after{} 添加选中效果
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center/ 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
</style>
