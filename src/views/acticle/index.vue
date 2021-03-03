<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="**头条号**"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- :TODO:加载中 -->
      <div v-if="loading" class="loading-wrap">
        <!-- load组件 -->
        <van-loading color="#3296fa" vertical>加载中...</van-loading>
      </div>
      <!-- /加载中 -->

      <!--:TODO: 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!--TODO:  加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!--TODO:  加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArtcile" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
// 引入方法
import { getArticleById } from '@/api/article'
// 图片预览
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
ImagePreview({
  // 图片地址
  images: [
    'https://img.yzcdn.cn/vant/apple-1.jpg',
    'https://img.yzcdn.cn/vant/apple-2.jpg'
  ],
  // 预览图片的起始位置
  startPosition: 1,
  // 点击关闭
  onClose() {
    // do something
  }
})
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      // 类型为数字 字符串 对象
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {}, // 这里是文章详情
      loading: true, // 加载中的loading状态
      errStatus: 0 // 这是失败的状态码
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArtcile()
  },
  mounted() {},
  methods: {
    async loadArtcile() {
      // 重新加载 转圈
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // TODO:模拟随机失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dasdafrwer')
        // }
        this.article = data.data
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
        // 加载完成
        this.loading = false
        // console.log(data)
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // this.loading = false
        console.log('获取失败...')
      }
      // 无论成功还是失败,都需要关闭loading
      this.loading = false
    },
    previewImg() {
      // 定义变量
      const contentEl = this.$refs.contentRef
      const allImg = contentEl.querySelectorAll('img')
      const images = []
      allImg.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            // 图片
            images,
            startPosition: index
          })
        }
      })
    },
    async onFollow() {
      // 开启按钮的 loading 状态
      this.isFollowLoading = true

      try {
        // 如果已关注，则取消关注
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
          // 否则添加关注
          await addFollow(authorId)
        }
        // 更新视图
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的 loading 状态
      this.isFollowLoading = false
    }
  }
}
</script>

<style scoped lang="less">
// 引入github css样式
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
