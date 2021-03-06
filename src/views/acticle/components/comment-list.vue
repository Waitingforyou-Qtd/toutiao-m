<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败..."
    @load="onLoad"
  >
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  components: {},
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 用来获取下一页的标记
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 抛出异常
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 每页大小
        })

        console.log(data)

        // 2. 将数据添加到列表中
        const { results } = data.data
        // 数组合并
        this.list.push(...results)
        // 更新总数据条数
        this.totalCount = data.data.total_count
        // 3. 将加载更多的 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，关闭加载更多
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
