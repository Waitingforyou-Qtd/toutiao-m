<template>
  <div class="home-container">
    <!-- 导航栏 频道列表固定定位-->
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 自定义插槽 -->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 通过active设定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
    <!-- 可以通过animated来设置是否启用切换 tab 时的动画。 -->
    <!-- 通过swipeable属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- 遍历 id 频道名称  -->
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 频道内容 -->
        <!-- 文章列表  频道传给组件-->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        @click="isEditChannelShow = true"
        class="hamburger-btn"
      >
        <!-- 更多图标 -->
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
    /></van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
// 1axios.defaults.baseURL=加载请求方法
import { getUserChannels } from '@/api/user'
// 加载组件
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    // 注册组件
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      // 被激活的标签
      active: 0,
      // 4. 定义数据接收频道列表
      channels: [], // 频道列表
      isEditChannelShow: false // 控制编辑频道弹出层的显示状态
    }
  },
  computed: {},
  watch: {},
  created() {
    // 3. 调用获取频道列表
    this.loadChannels()
  },
  mounted() {},
  methods: {
    // 2. 定义加载频道列表数据的方法
    async loadChannels() {
      try {
        // 捕获异常
        const { data } = await getUserChannels()
        // 添加到实例
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 172px;
  padding-bottom: 100px;
}
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset; // 撑开
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #1284f7;
    border: none; //去除边框
    font-size: 28px;
    .van-icon {
      // 图标样式
      font-size: 32px;
    }
  }
  // 深度操作符
  /deep/.channel-tabs {
    .van-tabs__wrap {
      position: fixed; // 固定定位
      top: 92px;
      z-index: 1; //层级关系
      width: 100%;
      height: 80px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid palevioletred;
      font-size: 32px;
      color: peru;
    }
    .van-tab--active {
      color: paleturquoise;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 30px !important;
      height: 6px;
      background-color: indianred;
    }
    .placeholder {
      flex-shrink: 0; //剩余空间
      width: 66px;
      height: 80px;
    }
    .hamburger-btn {
      position: fixed; //固定定位
      right: 0; //最右侧
      display: flex; //flex布局
      justify-content: center; //水平居中
      align-items: center; //垂直居中
      width: 66px;
      height: 80px;
      background-color: #fff;
      opacity: 0.902; //透明度
      i.toutiao {
        font-size: 35px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain; //长边显示
      }
    }
  }
}
</style>
