<template>
  <!-- 👍空心 实心点赞👍 -->
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    // 数字
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      try {
        let status = -1
        // 如果已经点赞，则取消点赞
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功!' : '取消点赞!')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败...')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #f2725f;
  }
}
</style>
