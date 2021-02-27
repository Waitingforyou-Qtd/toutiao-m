<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            fit="cover"
            class="avatar"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            round
          />
          <span class="name">**头条**</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">345</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">110</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">380</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">160</span>
          <span class="text">点赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录头部 -->
    <!--未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录头部 -->
    <!-- 宫格 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <!-- 具名插槽 -->
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      clickable
      @click="onLogout"
      class="logout-cell"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      UserInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // 初始化的时候，如果用户登录了，请求获取当前登录用户的信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: '您确认要退出吗？'
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里!')
        })
    },
    async loadUserInfo() {
      // try..catch方法, 可以抛出错误, 但是不会影响整个程序运转
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 360px;
    background: url('~@/assets/banner.png'); //背景图
    background-size: cover; // 缩放填充整个页面
  }
  .not-login {
    display: flex; // flex布局
    justify-content: center; //水平居中
    align-items: center; //垂直居中
    .login-btn {
      display: flex; // flex布局
      flex-direction: column; // 调整主轴方向垂直居中显示
      justify-content: center; //水平居中
      align-items: center; //垂直居中
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 230px;
      padding: 76px 32px 23px;
      box-sizing: border-box; // C3盒子模型
      display: flex;
      justify-content: space-between; //两边撑开
      align-items: center; //水平居中
      .left {
        display: flex;
        align-items: center; //垂直居中
        .avatar {
          width: 130px;
          height: 130px;
          border: 2px solid #fff; //头像边框
          margin-right: 25px;
        }
        .name {
          font-size: 40px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex; //flxe布局
      .data-item {
        height: 130px;
        flex: 1; // 所有的子元素平分
        display: flex;
        flex-direction: column; //垂直分布
        justify-content: center; //水平居中
        align-items: center; // 垂直居中
        color: #fff;
        .count {
          font-size: 38px;
        }
        .text {
          font-size: 26px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 140px;
      i.toutiao {
        font-size: 46px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 32px;
      }
    }
  }
}
.logout-cell {
  height: 100px;
  text-align: center;
  color: #eb5253;
  margin: 10px 0;
  font-size: 30px;
}
</style>
