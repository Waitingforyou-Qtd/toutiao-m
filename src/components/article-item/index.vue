<template>
  <!-- Cell单元格的to属性和VueRouter中的RouterLink 导航组件的to 用法是一样的参考链接 https://router.vuejs.org/zh/installation.html-->
  <!-- :to="'/article/'+article.art_id" -->
  <!-- :to=`/article/${article.art_id}` -->
  <van-cell
    class="article-item"
    :to="{
      // 根据路由名称跳转
      name: 'article',
      // 传递参数，属性名要求是配置路由时路径中指定的名称，path: '/article/:articleId',
      params: {
        articleId: 'article.art_id'
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 3张图片 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <!-- 名字 评论 时间-->
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 图片 -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    // 接收参数
    article: {
      // 类型为对象,数据必须的
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  // title样式
  .title {
    font-size: 32px;
    color: peru;
  }
  .van-cell__value {
    flex: unset; //去除flex
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  // 右侧图片大小
  .right-cover {
    width: 232px;
    height: 146px;
  }
  // 评论文字
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1; //评分空间
      height: 146px;
      // 图片之间缝隙
      &:not(:last-child) {
        padding-right: 4px;
      }
      // 底部图片
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
