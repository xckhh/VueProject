<template>
<!-- 头部导航 -->
  <div class="top-header">
    <div class="top-container">
      <!--   mi图片   -->
      <img class="mi-icon" src="../../assets/image/09.png">
      <div style="height: 40px;width: 600px;background-color: black">
        <img src="../../assets/image/qq图片20220425192648.png" style="width: 100%;height: 100%">
      </div>
      <div class="header-navs-container">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="less">
  .top-header {
    width: 100%;
    height: 100px;

    .top-container {
      width: 1226px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .mi-icon {
        display: block;
        width: 55px;
        height: 55px;
      }
      .header-navs-container {
        width: 820px;
        display: flex;
        height: 100%;
      }
    }
  }
</style>