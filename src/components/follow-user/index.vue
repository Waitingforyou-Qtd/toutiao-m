<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    :loading="loading"
    size="small"
    @click="onfollow"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    v-else
    size="small"
    icon="plus"
    :loading="loading"
    @click="onfollow"
    >关注</van-button
  >
</template>

<script>
// 加载
import { addFollow, deleteFollow } from '@/api/user'
export default {
  // 组件名称
  name: 'FollowUser',
  components: {},
  // 自定义事件
  model: {
    prop: 'isFollowed', // 默认是 value
    event: 'update-is_followed' // 默认是 input
  },
  // 接受 布尔值
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },

  created() {},

  methods: {
    async onfollow() {
      // 开启按钮的 loading 状态
      this.loading = true
      try {
        // 如果已关注，则取消关注
        // const authorId = this.article.aut_id
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          // 否则添加关注
          await addFollow(this.userId)
        }
        // 更新视图
        // this.article.is_followed = !this.article.is_followed
        // 更新视图
        this.$emit('update-is_followed', !this.isFollowed)
        // this.$emit('input', !this.value)
        // this.$emit('update-is_followed', !this.value)
      } catch (err) {
        // console.log(err)
        let massage = '操作失败,请重试...'
        // this.$toast.fail('操作失败...')
        if (err.response && err.response.status === 400) {
          massage = '自己不能关注自己⚠'
        }
        this.$toast(massage)
      }
      // 关闭按钮的 loading 状态
      this.loading = false
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped lang="less"></style>
