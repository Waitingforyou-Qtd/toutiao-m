<template>
  <div id="app">
    <router-view />
    <h1>**头条**</h1>
    <div id="app">
      <i class="toutiao toutiao-dianzan2"></i>
    </div>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-cell title="单元格" is-link />
    <van-cell title="单元格" is-link value="内容" />
    <van-cell title="单元格" is-link arrow-direction="down" value="内容" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less"></style>
