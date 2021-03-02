<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories', [])">全部删除</span>
        &nbsp;&nbsp; <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <!-- 遍历 -->
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'SearchHistory',
  components: {},
  // 声明接收
  props: {
    // Prop数据 prop是受父组件数据影响的
    // 如果是普通数据(数字/字符串/布尔值)绝对不能修改
    // 即便改了也不会传导至父组件
    // 如果是引用类型数据(数组/对象)
    // 可以修改 例如[].push(xxx) 对象.xxx=xxx
    // 不能重新赋值 xxx=[]
    // 接收的是数组
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 定义方法
    onSearchItemClick(item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        // 删除状态,删除历史记录数据  修改数组里面的数据
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
