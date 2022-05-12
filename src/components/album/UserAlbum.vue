<!--
 * @FileDescription: 相册
 * @Author:
 * @Date:
 * @LastEditors:
 * @LastEditTime:
 -->
<template>
  <div class="album-container">
    <div class="menu-container">
      <el-tabs style="margin-left: 20px" v-model="activeName" :before-leave="leaveTabs" @tab-click="tabsClick">
        <el-tab-pane label="相册" name="0">
          <div class="img_container">
            <div class="album" v-for="(item,index) in albumData" :key="index">
              <a href="#" @click.prevent="getPhotoList(item.album_id)">
                <img :src="'http://localhost:8099/images/'+item.cover">
                <div class="img-bottom">{{ item.album_name }}</div>
              </a>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相册创建" name="1">
          <div class="creat-album">
            <el-form ref="creat-album-ref" :model="albumFormData" label-width="80px" :rules="albumRules">
              <el-form-item label="相册名称" prop="album_name">
                <el-input v-model="albumFormData.album_name"></el-input>
              </el-form-item>
              <el-form-item label="相册描述">
                <el-input type="textarea"  style="width: 300px;" :rows="3" placeholder="可以为空" v-model="albumFormData.album_description"></el-input>
              </el-form-item>
              <el-form-item label="相册封面">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :http-request="addCover"
                    :on-remove="removeCover"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    ref="coverRef"
                    >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="照片时间" prop="photo_time">
                <el-col :span="11">
                  <el-date-picker type="date" v-model="albumFormData.photo_time" placeholder="选择日期" ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="权限" prop="jurisdiction">
                <el-select placeholder="请选择浏览权限" v-model="albumFormData.jurisdiction">
                  <el-option label="所有人可见" value="所有人可见"></el-option>
                  <el-option label="仅好友可见" value="仅好友可见"></el-option>
                  <el-option label="仅自己可见" value="仅自己可见"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="creatAlbum">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传照片" name="2">
          <div class="upload-img">
            <div style="margin-bottom: 10px">
              <el-select placeholder="请选择相册"  v-model="album_id">
                <el-option :label="item.album_name" :value="item.album_id" v-for="(item,index) in albumData" :key="index"></el-option>
              </el-select>
              <el-button size="small" type="primary" style="margin-left: 20px" @click="uploadPhoto">确认上传</el-button>
            </div>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-remove="handleRemove"
                :http-request="addPhoto"
                multiple
                :on-preview="handlePictureCardPreview"
                ref="uploadRef">
              <i class="el-icon-plus"></i>
            </el-upload>

          </div>
        </el-tab-pane>
        <el-tab-pane label="回收站" name="3">
          <div class="img_container">
            <div class="album" v-for="(item,index) in RecoveryList" :key="index">
              <a href="#" @click.prevent="recoveryPhoto(item)">
                <img :src="'http://localhost:8099/images/'+item.photo_path" style="width: 100%;height: 100%;">
              </a>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--  图片预览  -->
    <el-dialog :visible.sync="dialogVisible" style="width: 1000px;height: 1000px;">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!--  相册预览  -->
    <el-dialog :visible.sync="albumDialogVisible">
      <div class="photo_container">
        <div class="photo_dialog" v-for="(item,index) in photoData" :key="index">
          <img :src="'http://localhost:8099/images/'+ item.photo_path">
          <el-button icon="el-icon-delete" circle @click="deletePhoto(item)"></el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserAlbum",
  data (){
    return {
      // 相册数据
      albumData: {},
      // 创建相册数据
      albumFormData: {
        album_name: '',
        album_description: '',
        photo_time: '',
        jurisdiction: '',
        id: window.sessionStorage.getItem('id')
      },
      // 相册封面
      cover: [],
      // 创建相册表单验证
      albumRules: {
        album_name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        photo_time: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        jurisdiction: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      // 当前的tabs页码
      activeName: '0',
      // 图片预览
      dialogImageUrl : '',
      dialogVisible : false,
      // 相册预览弹框是否打开
      albumDialogVisible: false,
      // 上传照片数据
      album_id: '',
      // 上传照片时
      photoList: [],
      // 预览相册时
      photoData: [],
      // 回收站数据
      RecoveryList: []
    }
  },
  created() {
    this.getAlbum()
  },
  methods: {
    // 获取相册数据
    async getAlbum(){
      const result = this.$store.dispatch('getAlbum',window.sessionStorage.getItem('id'))
      result.then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('相册数据获取失败!')
        }
        this.albumData = res.data
      })
    },
    // 创建相册
    creatAlbum() {
      // 使用formData
      const formData = new FormData()
      formData.append('album',new Blob([JSON.stringify(this.albumFormData)],{ type: 'application/json'}))
      formData.append('file',this.cover)
      this.$refs["creat-album-ref"].validate( async valid => {
        if (!valid){
          return null
        }
        const { data: res } = await this.$http.post('/album/createdAlbum',formData)
        if (res.meta.status !== 200) {
          return this.$message.error('相册创建失败!')
        }
        this.$message.success('相册创建成功!')
        this.removeData()
        this.$refs['coverRef'].clearFiles()
        this.removeCover()
      })

    },
    // 切换tabs页前的钩子
    leaveTabs(){
      // 如果跳转之前的页面是 1 则清空1里的数据
      if (this.activeName==='1'){
        this.removeData()
      }
    },
    // 清空相册创建里的数据
    removeData(){
      this.albumFormData.album_name = ''
      this.albumFormData.album_description = ''
      this.albumFormData.photo_time = ''
      this.albumFormData.jurisdiction = ''
      this.$refs["creat-album-ref"].resetFields()
    },
    // 照片上传之前验证图片格式
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.cover = file
      return isJPG && isLt2M;
    },
    // 移除图片
    handleRemove(file, fileList) {
      // file是被移出的文件 fileList是当前剩下的文件数组 只需要将fileList赋值给photoList
      this.photoList = fileList
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片
    async uploadPhoto() {
      // 封装相册id和图片集合
      const formData = new FormData()
      if (this.album_id === ''){
        return this.$message.error('请选择相册!')
      }
      if (this.photoList.length===0){
        return this.$message.error('请选择照片!')
      }
      const photo= {
        photo_id: '',
        photo_path: '',
        album_id: this.album_id
      }
      formData.append('photo',new Blob([JSON.stringify(photo)],{type: 'application/json'}))
      this.photoList.forEach(item => {
        formData.append('file',item.file)
      })
      const { data: res } = await this.$http.post('/photo/uploadPhotoList',formData)
      this.$message.success('照片上传成功!')
      // 清空表单数据
      this.album_id = ''
      this.photoList = []
      this.$refs['uploadRef'].clearFiles();
    },
    // 往照片数组里添加数据
    addPhoto(file) {
      this.photoList.push(file)
    },
    // 点击tabs后
    tabsClick() {
      if(this.activeName==='0'|| this.activeName==='2'){
        this.getAlbum()
      }
      if (this.activeName==='3'){
        this.selectPhotoList()
      }
    },
    // 添加封面图片
    addCover(file) {
      // 修改样式
      document.querySelector('.el-upload--picture-card').style.display = 'none'
    },
    // 移除封面照片
    removeCover(){
      this.cover=[]
      // 移除添加的样式
      document.querySelector('.el-upload--picture-card').style.display = ''
    },
    //获取照片集合
    getPhotoList(album_id){
      this.albumDialogVisible = true
      const result = this.$store.dispatch('getPhotoList',album_id)
      result.then(item => {
        this.photoData = item.data
      })

    },
    // 删除照片
    deletePhoto(item){
      this.$confirm('此操作将删除该照片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: res} = await this.$http.delete(`/photo/deletePhoto/${item.photo_id}`)
        if (res.meta.status !== 200) {
          return  this.$message.error('照片删除失败!')
        }
        this.getPhotoList(item.album_id)
        await this.addRecoveryPhoto(item)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
      });
    },
    // 回收站获取数据
    async selectPhotoList(){
      const { data: res } = await this.$http.get('/recovery/getPhotoList')
      if (res.meta.status !== 200){
        return this.$message.warning(res.meta.msg)
      }
      this.RecoveryList = res.data
    },
    // 将删除的照片加入回收站
    async addRecoveryPhoto(photo){
      const { data: res } = await this.$http.post('/recovery/addPhoto',photo)
      if (res.meta.status !== 200){
        return this.$message.warning(res.meta.msg)
      }
    },
    // 将照片从回收站回收
    async recoveryPhoto(item){
      this.$confirm('是否回收照片?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async () => {
        const {data: res} = await this.$http.post('/recovery/recoveryPhoto', item)
        this.$message.success('照片回收成功!')
        await this.selectPhotoList()
      }).catch(res => res)
    }
  }
}
</script>

<style lang="less" scoped>
.album-container{
  width: 1226px;
  height: 620px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ededed;
  .menu-container{
    width: 100%;
    // 相册
    .img_container{
      margin-left: 20px;
      width: 1185px;
      height: 100%;
      display:flex;
      flex-wrap: wrap;
      .album{
        width: 200px;
        height: 200px;
        margin-left: 30px;
        margin-top: 8px;
        margin-bottom: 14px;
        border: 1px solid black;
        a{
          width: 100%;
          height: 100%;
          display: inline-block;
          img{
            width: 100%;
            height: 90%;
          }
          .img-bottom{
            font-size: 8px;
            font-weight: 700;
            text-align: center;
          }
        }
      }
    }
    // 相册创建
    .creat-album{
      margin-top: 30px;
      margin-left: 30px;
      .el-input{
        width: 200px;
      }
    }
  }
}

// 相册预览弹框
.photo_container{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  // 图片框
  .photo_dialog{
    width: 160px;
    height: 160px;
    margin: 0px 50px 20px 20px;
    background-color: black;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .el-button{
      margin-top: -15px;
      margin-left: 125px;
      position: absolute;
    }
  }
}

/deep/ #tab-0{
  font-weight: 700;
  font-size: 16px;
}
/deep/ #tab-1{
  font-weight: 700;
  font-size: 16px;
}
/deep/ #tab-2{
  font-weight: 700;
  font-size: 16px;
}
/deep/ #tab-3{
  font-weight: 700;
  font-size: 16px;
}
</style>