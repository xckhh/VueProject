<template>
  <!--  热门推荐  -->
  <div class="flash-sale">
    <div class="box-header">
      <h2 class="box-title">热门</h2>
    </div>
    <div class="box-sale">
      <!--   右侧介绍框   -->
      <div class="sale-count-down">
        <img src="../../assets/image/13.jpg" style="width: 100%;height: 100%;">
      </div>
      <!--   移动图框   -->
      <div class="block" style="width: 992px">
        <el-carousel height="340px" >
          <el-carousel-item v-for="(item,index) in showData" :key="index">
            <ul class="slide-container">
              <!--   单个移动图框   -->
              <li class="slide-item" v-for="(item2,index2) in item" :key="index2" >
                <a href="#" @click.prevent="isLogin(item2.id)">
                  <img :src="'http://localhost:8099/images/'+item2.photo"  style="width: 100%">
                  <h3 class="name ellipsis">{{item2.name}}</h3>
                  <span class="desc ellipsis">{{item2.age}}岁</span>
                  <div class="price">
                    <span>{{item2.region}}</span>
                  </div>
                </a>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Hot',
  data() {
    return {
      userList:[]
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
        this.userList = res.data
      })
    }
  },
  computed: {
    showData() {
      const newArr = [];
      for(let i = 0; i < this.userList.length; i += 4){
        newArr.push(this.userList.slice(i, i + 4));
      }
      return newArr;
    }
  }
}
</script>

<style lang="less">
  .flash-sale {
    position: relative;
    width: 1226px;
    height: auto;
    padding-top: 4px;
    margin: 0 auto;
  }

  .box-header {
    text-align: start;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-title {
      display: inline-block;
      font-size: 22px;
      font-weight: 200;
      line-height: 58px;
      color: #333;
    }
  }

  .box-sale {
    display: flex;
    .sale-count-down {
      display: inline-block;
      width: 234px;
      height: 340px;
      background: #f1eded;
    }
  }

  .slide-control {
    display: flex;
    border: 1px solid #e0e0e0;
    .slide-button {
      padding: 0 4px;
      font-size: 20px;
      font-weight: 800;
      line-height: 20px;
      color: #b0b0b0;
      text-align: center;
      transition: color .5s;
      cursor: pointer;
      &:hover {
        background-color: #ff6700;
      }

      i {
        width: 26px;
        height: 18px;
      }
    }
  }
  .slide-item{
    height: 340px;
    width: 234px;
    margin: 0 0 0 13px;
    border: 1px solid black;
    float: left;
    text-align: center;
  }
</style>