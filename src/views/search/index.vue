<template>
  <div class="search-container">
    <!-- van-search 支持自定义右侧取消按钮，使用名字为 action 的 slot，并设置 use-action-slot 为 true 即可。 -->
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词..."
        background="#2892ff"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
      <!-- focus获取焦点触发 -->
    </form>
    <!-- /顶部搜索栏 -->

    <!-- 搜索结果 判断条件-->
    <search-result :search-text="searchText" v-if="isResultShow" />
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion
      @search="onSearch"
      :search-text="searchText"
      v-else-if="searchText"
    />
    <!-- /联想建议 -->
    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    />
    <!-- /搜索历史记录-->
  </div>
</template>

<script>
// 注册组件
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'SearchIndex',
  // 注册组件
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示数据
      // 如果通过本地存储拿到的数据有效就使用,如果拿到数据无效没有就返回空数组初始化数据
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  computed: {},
  watch: {
    searchHistories(val) {
      // console.log('AAAAA')
      // 同步到本地存储
      setItem('TOUTIAO_SEARCH_HISTORIES', val)
    }
  },
  created() {},
  methods: {
    // 接收参数
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 从index开始删除1个
        this.searchHistories.splice(index, 1)
      }
      // 搜索的内容插在最前面
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      // 点击退出
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 110px;
  // 取消样式
  .van-search__action {
    color: paleturquoise;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
