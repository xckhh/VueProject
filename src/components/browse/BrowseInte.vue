<!--
 * @FileDescription: 浏览
 * @Author:
 * @Date:
 * @LastEditors:
 * @LastEditTime:
 -->
<template >
  <div class="browse-container" v-cloak>
    <div class="userInfo-img">
    <!--   左侧图片区域   -->
      <div class="user-img">
        <div class="top-img">
          <img  v-if="imgUrl" :src="imgUrl">
          <div v-else></div>
        </div>
        <div class="bottom-img">
          <el-carousel :interval="1000" type="card" arrow="never" indicator-position="none" @change="move">
            <el-carousel-item v-for="(item,index) in photoList" :key="index" >
              <img :src="'http://localhost:8099/images/' + item.photo_path" style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    <!--   右侧信息区域   -->
      <div class="user-info">
        <h2 style="margin: 20px 0 20px 20px;color: #ffb366">{{ username }}</h2>
        <el-descriptions title="" direction="horizontal" :column="3" border :labelStyle="labStyle">
          <el-descriptions-item label="姓名" contentStyle="width:130px">{{ userData.name }}</el-descriptions-item>
          <el-descriptions-item label="性别" >{{ userData.gender }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ userData.email }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{ userData.phone }}</el-descriptions-item>
          <el-descriptions-item label="年龄">{{ userData.age }}</el-descriptions-item>
          <el-descriptions-item label="所在地">{{ userData.region }}</el-descriptions-item>
          <el-descriptions-item label="出生年月">{{ userData.birthday | dateFormat }}</el-descriptions-item>
          <el-descriptions-item label="婚姻状况">{{ conditionData.marital_status }}</el-descriptions-item>
          <el-descriptions-item label="买车情况">{{ conditionData.car_number }}</el-descriptions-item>
          <el-descriptions-item label="买房情况">{{ conditionData.house_number }}</el-descriptions-item>
          <el-descriptions-item label="身高">{{ userData.height }}</el-descriptions-item>
          <el-descriptions-item label="体重">{{ userData.weight }}</el-descriptions-item>
          <el-descriptions-item label="兴趣爱好" :span="4">
            <el-tag v-for="(item,index) in conditionData.hobby" :key="index" style="margin-right: 8px;font-size: 14px;font-weight: 700;">
              {{ item }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="个性签名" :span="4">
            {{ conditionData.personal_signature }}
          </el-descriptions-item>
          <el-descriptions-item label="对另一半的要求" :span="4">
            {{ conditionData.requirement }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="bottom-btn">
          <el-button type="primary" icon="el-icon-star-on" round v-if="isBeckoning" @click="isBeckoning=false">已关注</el-button>
          <el-button type="primary" icon="el-icon-star-off" round v-else @click="isBeckoning=true" style="width: 108px">关注</el-button>
          <el-button type="info" round @click="goMain" >退出</el-button>
        </div>
      </div>
    </div>
  <!--  底部相册  -->
    <div class="album-container">
      <div class="album" v-for="(item,index) in albumData" :key="index">
        <a style="width: 115px;height: 115px;display: inline-block;" href="#" @click="getPhotoList(item.album_id)">
          <img :src="'http://localhost:8099/images/'+item.cover" style="width: 100%;height: 100%;">
          <h3 class="name ellipsis">{{item.album_name}}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "browseInte",
  created() {
    this.getUserById()
    this.getPersonalData()
    this.getAlbum()
    this.getPhotoList(this.$route.query.album_id)
  },
  data() {
    return{
      // 当前相册id
      album_id: '',
      // 是否已经关注
      isBeckoning: false,
      // label样式
      labStyle: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#909399',
        backgroundColor: 'white',
      },
      // 用户信息
      userData: {},
      // 基本信息
      conditionData: {},
      // 相册信息
      albumData: {},
      // 照片集合
      photoList: [],
      imgUrl: '',
      username: window.sessionStorage.getItem('username')
    }
  },
  methods: {
    // 通过id获取用户信息
    getUserById() {
      const result = this.$store.dispatch('getUserById',this.$route.query.id)
      result.then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('用户数据获取失败!')
        }
        this.userData = res.data
      })
    },
    // 通过id获取基本信息
    getPersonalData() {
      const result = this.$store.dispatch('getPersonalData',this.$route.query.id)
      result.then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('数据获取失败!')
        }
        this.conditionData = res.data
        this.conditionData.hobby = this.conditionData.hobby ? this.conditionData.hobby.split(' ') : []
      })
    },
    // 获取相册信息
    getAlbum() {
      const result = this.$store.dispatch('getAlbum',this.$route.query.id)
      result.then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('数据获取失败!')
        }
        this.albumData = res.data
      })
    },
    // 获取照片集合
    getPhotoList(album_id){
      const result = this.$store.dispatch('getPhotoList',album_id)
      result.then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('数据获取失败!')
        }
        this.photoList = res.data
        window.scrollTo(100,100);
      })
    },
    // 走马灯切换时，更换url
    move(pre){
      this.imgUrl = 'http://localhost:8099/images/' + this.photoList[pre].photo_path
    },
    // 点击退出按钮回到main
    goMain(){
      this.$router.push('/main')
    },
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
[v-cloak]{
  display:none;
}
.browse-container {
  width: 1226px;
  height: 700px;
  margin: 10px auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid #b0b0b0;
  .userInfo-img{
    margin: 20px 20px 0px 20px;
    width: 1190px;
    height: 500px;
    position: relative;

    .user-img{
      width: 350px;
      height: 100%;
      border: 1px solid #b1bece;
      .top-img{
        width: 100%;
        height: 70%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .bottom-img{
        width: 100%;
        height: 30%;
        .el-carousel__container{
          height: 70% !important;
          .el-carousel__item{
            height: 50%;
          }
        }
      }
    }
    .user-info{
      width: 835px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #b1bece;
      .bottom-btn{
        width: 100%;
        height: 93px;
        text-align: right;
        line-height: 110px;
        .el-button{
          margin-right: 30px;
        }
      }
    }
  }
  .album-container{
    width: 1185px;
    height: 115px;
    position: absolute;
    bottom: 45px;
    left: 20px;
    display:flex;
    flex-wrap: wrap;
    .album{
      width: 115px;
      height: 115px;
      background-color: pink;
      margin-right: 20px;
      text-align: center;
    }
  }
}
</style>