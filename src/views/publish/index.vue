<template>
  <!-- 基础布局 -->
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="changeType" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
            <!-- 图片按钮 -->
            <!-- 判断为1 是 使用一个组件 -->
            <div v-if="articleForm.cover.type ===1">
              <my-images v-model="articleForm.cover.images[0]"></my-images>
            </div>
            <!-- 为3时  使用三个组件 -->
            <div v-if="articleForm.cover.type ===3">
              <my-images v-model="articleForm.cover.images[0]"></my-images>
              <my-images v-model="articleForm.cover.images[1]"></my-images>
              <my-images v-model="articleForm.cover.images[2]"></my-images>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button type="info" @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button type="info" @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    //   富文本
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      //  表单数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 当时编辑的时候才会有的id
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  // 监听发表文章的状态
  watch: {
    '$route.query.id': function (newVal, oldVal) {
      // 当编辑文章变成发步文章 清空表单数据
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
      this.articleId = null
    }
  },
  methods: {
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    changeType () {
      // 切换类型时候 因为选中的的图片还有  所以要重置数据
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 发送成功提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 条状发哦文章列表页面
      this.$router.push('/article')
    },
    async update (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 发送成功提示
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 条状发哦文章列表页面
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
