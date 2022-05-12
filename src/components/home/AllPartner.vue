<template>
<!-- 所有伴侣 -->
  <div class="goods-sale">
    <div class="good-box">
      <div class="box-header">
        <h2 class="box-title">全部</h2>
        <div class="type-more" >
          <a target="_blank">
            <span>查看全部</span>
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
      <div class="box-content">
        <div class="promo-content">
          <div class="promo-one">
            <a class="brick-item" href="#" @click.prevent="isLogin">
              <img src="../../assets/image/13.jpg">
            </a>
          </div>
        </div>
        <div class="goods-content">
          <div class="goods-one">
            <div class="goods-item brick-item" v-for="(item, index) in userList" :key="index">
              <a href="#" @click.prevent="isLogin(item.id)">
                <img :src="'http://localhost:8099/images/' + item.photo" >
                <h3 class="name ellipsis">{{item.name}}</h3>
                <span class="desc ellipsis">{{item.age}}岁</span>
                <div class="price">
                  <span>{{item.region}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllPartner',
  data () {
    return {
      photo:'',
      userList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 点击导航
    async isLogin(id) {
      if (window.sessionStorage.getItem('token') === null) {
        return this.$notify({
          title: '提示',
          message: '请先进行登录操作',
          offset: 30
        });
      } else {
        if (this.$route.path != '/browse') {
          const {data: res} = await this.$http.get(`/album/getAlbumId/${id}`)
          this.$router.push({
            path: '/browse',
            query: {id: id, album_id: res}
          })
        }
      }
    },
    // 获取用户集合
    async getUserList() {
      const result = this.$store.dispatch('getUserList')
      result.then(res => {
        for (let i = 0; i < 8; i++) {
          this.userList.push( res.data[i])
        }
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
  .goods-sale {
      position: relative;
      width: 1226px;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
  }
  .good-box {
    position: relative;
    width: 1226px;
    height: auto;
    margin: 0 auto;
  }

  .box-header {
    .type-more {
      display: inline-block;
      a {
        font-size: 16px;
        display: flex;
        align-items: center;
        span {
          color: #424242;
          transition: all .4s;
        }

        i {
          width: 20px;
          height: 20px;
          margin-left: 8px;
          border-radius: 16px;
          font-size: 15px;
          line-height: 20px;
          background: #b0b0b0;
          color: #fff;
          text-align: center;
          vertical-align: 2px;
          transition: all .4s;
        }

        &:hover {
          span {
            color: #ff6709;
          }

          i {
            background: #ff6709;
          }
        }
      }
    }
  }

  .box-content {
    display: flex;
    .promo-content .promo-one {
      a {
        display: block;
        height: 614px;
        img {
          height: 100%;
          width: 234px;
        }
      }
    }
    .goods-content .goods-one{
      width: 992px;
      display: flex;
      flex-wrap: wrap;
      .goods-item {
        background: #fff;
        height: 300px;
        padding: 20px 0;
        width: 234px;
        margin-left: 14px;
        margin-bottom: 14px;
        text-align: center;
      }
    }
    .goods-content {
      a {
        display: block;
        img {
          width: 160px;
          height: 160px;
          margin: 0 35px 18px;
        }

        .name {
          font-size: 14px;
          font-weight: 400;
          color: #333;
          margin: 0 10px 2px;
        }

        .desc {
          display: block;
          margin: 0 10px 10px;
          height: 18px;
          font-size: 12px;
          color: #b0b0b0;
        }

        .price {
          margin: 0 10px 14px;
          font-size: 14px;
        }
      }
    }
  }

</style>