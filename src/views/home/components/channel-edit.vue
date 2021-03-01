<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我的频道项注册点击事件 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <!-- :TODO:  v-bind:class语法:一个对象,对象中的key表示要作用的CSS类名,对象中的value要计算出布尔值
      如果为true 则作用该类名  false 不作用于类名-->
        <!--:TODO: 通过插槽自定义图标 -->
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        />
        <span :class="{ active: index === active }" slot="text" class="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- :TODO:  频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
// 加载
import { getAllChannels } from '@/api/channel'
export default {
  // 组件名称
  name: 'ChannelEdit',
  components: {},
  props: {
    // 接收一个数组
    myChannels: {
      type: Array,
      required: true
    },
    // 接收一个数字
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // 存放所有频道
      allChannels: [],
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0] // 固定频道,不允许删除
    }
  },
  computed: {
    // :TODO:  // :TODO: 计算属性会观测内部依赖数据的变化,如果依赖的数据发送变化,则计算属性会重新执行,,,封装计算属性筛选数据 ---->:TODO:思路：所有频道 - 用户频道 = 推荐频道
    recommendChannels() {
      // :TODO:  filter方法,遍历数组,把符合条件的元存储到新的数组中并返回
      return this.allChannels.filter(channel => {
        // :TODO:  find 遍历数组,把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // :TODO: 第②种方法:recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包含该频道,则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  watch: {},
  created() {
    // 请求调用
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    // 加载所有频道
    async loadAllChannels() {
      // 捕获异常
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // :TODO: 点击我的频道
    onAddChannel(channel) {
      this.myChannels.push(channel)
    },
    // 点击我的频道  做判断
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 判断是否为推荐
        if (index === 0) return
        if (this.fiexChannels) {
          // !编辑状态,执行删除操作
          // !参数1:要删除的元素的索引
          // !参数2:删除的个数,如果不指定,则从参数1开始一直删除
          // !执行删除操作
          if (index <= this.active) {
            // !让激活频道的索引-1
            this.$emit('update-active', this.active - 1, true)
          }
        }
        this.myChannels.splice(index, 1)
      } else {
        // !非编辑状态, 执行跳转操作
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 86px 0;
  // 文字样式
  .title-text {
    font-size: 35px;
    color: #222;
    font-weight: 600; //文字加粗效果
  }
  // 编辑按钮样式
  .edit-btn {
    width: 110px;
    height: 55px;
    font-size: 30px;
    color: #f85959;
    border: 2px solid #f85959;
  }
  // 分类模块
  /deep/.grid-item {
    width: 160px;
    height: 88px;
    .van-grid-item__content {
      white-space: nowrap; //不换行
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #393b3d;
        margin-top: 0;
      }
      .van-grid-item__icon-wrapper {
        position: unset; //去掉定位
      }
      // 高亮效果
      .active {
        color: red;
        font-size: 36px;
        font-weight: 600;
      }
    }
  }
  // 关闭按钮样式
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 36px;
        color: #ccc;
        z-index: 2; //层级关系  它在上面
      }
    }
  }
  // 频道推荐模块样式
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row; //水平排列
        .van-icon-plus {
          font-size: 30px;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
