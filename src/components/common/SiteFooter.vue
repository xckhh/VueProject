<!--
 * @FileDescription: 页脚
 * @Author:
 * @Date:
 * @LastEditors:
 * @LastEditTime:
 -->
<template>
  <div class="site-footer">
    <ul class="site-service">
      <li class="service-item" v-for="(item, index) in serviceInfo" :key="index">
        <a :href="item.url">
          <i :class="item.font"></i>
          <span>{{item.value}}</span>
        </a>
      </li>
    </ul>
    <div class="site-link">
      <div class="links">
        <div class="link-container" v-for="(list, key) in serviceLink" :key="key">
          <span class="link-title">{{list.value}}</span>
          <ul class="link-list">
            <li class="link-item" v-for="(item, index) in list.subLinks" :key="index">
              <a :href="item.url">
                {{item.value}}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="link-contact">
        <p class="phone">123-123-123</p>
        <p class="desc">周一至周日 8:00-18:00<br>（仅收市话费）</p>
        <a href="#" @click.prevent>
          <i class="iconfont icon-icon-test1"></i>
          <span>人工客服</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SiteFooter',
  data () {
    return {
      serviceInfo: [
        {value: '神秘小礼物', font:'iconfont icon-liwu', url: null},
        {value: '线下相亲店', font:'iconfont icon-icon-test', url: null}
      ],
      serviceLink: [
        {value: '帮助中心', subLinks: [
          {value: '账号管理', url: null},
          {value: '相亲指南', url: null},
          {value: '操作步骤', url: null}
        ]},
        {value: '服务支持', subLinks: [
          {value: '最佳助攻', url: null},
          {value: '场景布置', url: null},
          {value: '烘托氛围', url: null}
        ]},
        {value: '线下门店', subLinks: [
          {value: '相亲之家', url: null},
          {value: '服务网点', url: null},
          {value: '到店了解', url: null}
        ]},
        {value: '关于相亲', subLinks: [
          {value: '了解相亲', url: null},
          {value: '加入相亲', url: null},
        ]},
        {value: '关注我们', subLinks: [
          {value: '新浪微博', url: null},
          {value: '官方微信', url: null},
          {value: '联系我们', url: null}
        ]},
        {value: '特色服务', subLinks: [
          {value: 'vip通道', url: null},
          {value: '面对面快聊', url: null},
        ]}
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
  .site-footer {
    position: relative;
    width: 1226px;
    height: auto;
    margin: 0 auto;
    text-align: center;
    .site-service {
      display: flex;
      justify-content: center;
      text-align: center;
      padding: 27px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .site-link {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      .links {
        display: flex;
      }
    }
  }

  .service-item {
    width: 19.8%;
    height: 25px;
    border-left: 1px solid #e0e0e0;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    &:first-child {
      border-left: none;
    }

    a {
      color: #616161;
      transition: color .2s;
      &:hover {
        color: #ff6709;
      }
      i {
        margin-right: 6px;
        font-size: 24px;
        line-height: 24px;
        vertical-align: -4px;
      }

      span {
        font-size: 16px;
        line-height: 25px;
      }
    }
  }

  .link-container {
    width: 160px;
    height: 112px;
    margin: 0;
    text-align: right;
    .link-title {
      display: block;
      margin: -1px 0 26px;
      font-size: 14px;
      line-height: 1.25;
      color: #424242;
    }

    .link-list, .link-item {
      margin: 10px 0 0;
      font-size: 12px;
      a {
        color: #757575;
        transition: color .2s;
        &:hover {
          color: #ff6709;
        }
      }
    }
  }

  .link-contact {
    width: 256px;
    height: 112px;
    border-left: 1px solid #e0e0e0;
    text-align: center;
    color: #616161;
    .phone {
      margin: 0 0 5px;
      font-size: 22px;
      line-height: 1;
      color: #ff6700;
    }

    .desc {
      margin: 0 0 16px;
      font-size: 12px;
    }

    a {
      display: inline-flex;
      justify-content: center;
      width: 118px;
      height: 28px;
      font-size: 12px;
      line-height: 28px;
      border: 1px solid #ff6700;
      background: #fff;
      color: #ff6700;
      transition: all .4s;
      &:hover {
        color: #fff;
        background-color: #f25807;
        border-color: #f25807;
      }
    }
  }
</style>