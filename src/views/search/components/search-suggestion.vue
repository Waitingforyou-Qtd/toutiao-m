<template>
  <div class="search-result">
    <!-- 点击联想进行搜索 -->
    <van-cell
      icon="search"
      :title="text"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
    <!-- 双花括号绑定会直接输出纯文本内容 -->
    <!-- <div>{{ htmlStr }}</div> -->
    <!-- 使用v-html指令可以绑定渲染带有HTML标签的字符串 -->
    <!-- <div v-html="htmlStr"></div> -->
  </div>
</template>

<script>
// 引入请求方法
import { getSearchSuggestions } from '@/api/search'
// lodash 防抖处理 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  // 组件名称
  name: 'SearchSuggestion',
  components: {},
  props: {
    // 声明并接收 字符串类型
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      // debounce 函数
      // 参数1：函数
      // 参数2：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(function(val) {
        this.loadSearchSuggestions(val)
      }, 800),
      // 当searchText发生改变的时候就会调用handler函数 监视的处理函数 handler函数名称是固定的
      // handler(val) {
      //   this.loadSearchSuggestions(val)
      // },
      // ! TODO:   该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  created() {},
  methods: {
    async loadSearchSuggestions(q) {
      // 抛出异常
      try {
        const { data } = await getSearchSuggestions(q)
        // console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取失败...')
      }
    },
    /**
     * 处理高亮文本
     * 思路：
     * 1. 想要在一个字符串中，将固定的字符特殊显示（改变颜色）
     * 2. 那么就需要在这个字符串中，找出该字符，然后为该字符设置单独的样式（span.active）
     * 拆解：
     *     1. 找出字符
     *     2. 替换字符
     *     3. 设置单独的样式比较容易（替换字符），难点在于找出字符
     * 如何找出字符：
     * 1. 那么《处理高亮文本》的问题，就变成，《如何在字符串中找出固定的字符》
     * 2. 在字符串中找出固定字符，大家首先想到的就应该是使用 -》 正则表达式
     * 3. 简单使用正则（text.replace(/匹配的内容/gi, highlightStr)） , 无法插入响应式数据
     * 4. 所以我们使用了 RegExp 对象。RegExp 构造函数创建了一个正则表达式对象，用于将文本与一个模式匹配。MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp
     * 5. 通过 RegExp 来完成响应式数据的正则匹配
     */
    highlight(text) {
      const highlightStr = `<span class="actived">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      // text.replace(/匹配的内容/gi, highlightStr)
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.actived {
    color: rgb(245, 120, 3);
  }
}
</style>
