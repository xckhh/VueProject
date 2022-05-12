<template>
  <div class="menu-banner">
    <!--  左侧菜单栏  -->
    <div class="menu-container" @mouseleave="bannerMenuHide()">
      <ul class="menu-list">
        <li class="list-item" v-for="(item, index) in menus" :key="index" @mouseenter="bannerMenuShow(item.type)">
          <a :href="item.url" target="blank">{{item.value}}</a>
        </li>
      </ul>
    </div>
    <!--  菜单弹框  -->
    <div class="menu-info" v-show="bannerMenuFlag" @mouseleave="bannerMenuHide()" @mouseenter="bannerMenuShow()">
        <ul class="menu-info-list" v-for="(list, key) in menuListMatch" :key="key" :data-key="key">
          <li class="info-list-item" v-for="(item, index) in list" :key="index" :data-index="index">
            <a>
              <img :src="item.src" :alt="item.name" />
							<span class="">{{item.name}}</span>
            </a>
          </li>
        </ul>
      </div>
    <div class="block">
      <el-carousel height="460px" :interval="2000">
        <el-carousel-item v-for="item in banners">
          <img :src="item.src" style="width: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuBanner',
  data () {
    return {
      // 菜单栏弹框是否显示
      bannerMenuFlag: false,
      listInfoData: [],
      menus: [
        {value: '天真善良', type: 'good'},
        {value: '温柔大方', type: ''},
        {value: '多才多艺', type: ''},
        {value: '事业有成', type: ''},
        {value: '帅气逼人', type: ''},
      ],
      banners: [
        {src: require('../../assets/image/1.jpg')},
        {src: require('../../assets/image/2.jpg')},
        {src: require('../../assets/image/3.jpg')},
        {src: require('../../assets/image/4.jpg')},
        {src: require('../../assets/image/5.jpg')},
      ],
      good: [
        {name: '海琴烟', src: require('../../assets/image/1.jpg')},
      ],
    }
  },
  methods: {
    // 鼠标离开菜单栏时，右侧弹框隐藏
    bannerMenuHide () {
      this.bannerMenuFlag = false;
    },
    // 鼠标停留菜单栏时，右侧弹框显示
    bannerMenuShow (type) {
      if (type) {
        this.listInfoData = this[type];
      }
      this.bannerMenuFlag = true;
    }
  },
  computed: {
    menuListMatch () {
      if (this.listInfoData && this.listInfoData.length) {
        const matchData = [];
        for (let i = 0; i < this.listInfoData.length; i += 6) {
          matchData.push(this.listInfoData.slice(i, i + 6));
        }
        return matchData;
      }
    }
  }
}
</script>

<style lang="less">
  .menu-banner {
    position: relative;
    width: 1226px;
    height: auto;
    margin: 0 auto;
    .menu-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 235px;
      height: auto;
      background: rgba(0, 0, 0, 0.3);
      z-index: 10;
    }
  }

  .menu-list {
    padding: 20px 0;
    height: 460px;
    .list-item {
      display: flex;
      padding-left: 30px;
      &:hover {
        background-color: #ff6700;
      }

      a {
        position: relative;
        display: inline-block;
        width: 170px;
        height: 42px;
        line-height: 42px;
        color: #fff;
        text-align: left;
        background-color: transparent;
      }

      i {
        font-size: 22px;
        color: #e0e0e0;
        line-height: 42px;
      }
    }
  }

  .menu-info {
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    left: 235px;
    top: 0;
    z-index: 11;
    border: 1px solid #e0e0e0;
    box-shadow: 3px 8px 16px rgba( 0, 0, 0, 0.18);
    .menu-info-list {
      width: 248px;
      height: 458px;
      margin: 0;
      padding: 0;
      list-style: none;
      background: #fff;
      a {
        display: flex;
        padding: 18px 20px;
        line-height: 40px;
        color: #333;
        img {
          width: 40px;
          height: 40px;
          margin-right: 12px;
          vertical-align: middle;
        }

        span {
          width: 172px;
          line-height: 40px;
          font-size: 14px;
          text-align: start;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &:hover {
          span {
            color: #ff6700;
          }
        }
      }
    }
  }
</style>