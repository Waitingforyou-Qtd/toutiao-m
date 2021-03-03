<template>
  <div class="search-result">
    <!-- 错误提示 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了..."
      :error.sync="error"
      error-text="请求失败，点击重新加载..."
      @load="onLoad"
    >
      <!-- 模板绑定 -->
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
// 请求获取
import { getSearchResult } from '@/api/search'
export default {
  // 组件名称
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onLoad() {
      // 捕获异常
      try {
        // ! 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页条数
          q: this.searchText // 搜索关键字
        })
        // TODO:模拟随机失败
        // if (Math.random() > 0.3) {
        //   JSON.parse('dasdafrwer')
        // }
        // !2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // !3. 设置加载状态结束
        this.loading = false
        //! 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
        // console.log(data)
      } catch (err) {
        this.error = true // !展示加载失败的提示
        this.loading = false // !加载失败了,loading也要关闭
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
