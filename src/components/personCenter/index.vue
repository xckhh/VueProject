<!--
 * @FileDescription: 个人资料
 * @Author:
 * @Date:
 * @LastEditors:
 * @LastEditTime:
 -->
<template>
  <div class="main-container">
    <div class="top-menu">
      <el-tabs type="border-card" tabPosition="left" style="height: 100%;width: 1226px;">
        <el-tab-pane label="账号信息" name="0">
          <el-descriptions class="margin-top" title="账号信息" :column="1"  border :labelStyle="styleLabel">
            <template slot="title">
              <div>
                <el-upload action="http://localhost:8099/user/updatePhoto" :data="uploadData" :show-file-list="false" list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <el-image v-if="isPhoto" :src="imageUrl"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                用户名
              </template>
              {{ userFormData.username }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                昵称
              </template>
              {{ accountData.nickname }}
              <el-button type="primary" size="small" @click="oneDialogVisible=true" style="float: right">更改</el-button>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                注册时间
              </template>
              {{ accountData.register_time | dateFormat }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                上次登录时间
              </template>
              {{ accountData.login_time | dateFormat }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                上次登录IP地址
              </template>
              {{ accountData.login_address }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="基本信息" name="1">
          <el-descriptions class="margin-top" title="基本信息" :column="1"  border :labelStyle="styleLabel">
            <template slot="extra">
              <el-button type="primary" size="small" @click="twoDialogVisible=true">更改</el-button>
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                姓名
              </template>
              {{ userFormData.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                年龄
              </template>
              {{ userFormData.age }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                性别
              </template>
              {{ userFormData.gender }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                身高
              </template>
              {{ userFormData.height }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                体重
              </template>
              {{ userFormData.weight }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                生日
              </template>
              {{ userFormData.birthday | dateFormat }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                邮箱
              </template>
              {{ userFormData.email }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                手机号
              </template>
              {{ userFormData.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                地区
              </template>
              {{ userFormData.region }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="条件简介" name="2">
          <el-descriptions class="margin-top" title="条件简介" :column="1"  border :labelStyle="styleLabel">
            <template slot="extra">
              <el-button type="primary" size="small" @click="threeDialogVisible=true">操作</el-button>
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                <!--                <span>用户名</span>-->
                职业类别
              </template>
              {{ personalData.work_type }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                月收入
              </template>
              {{ personalData.monthly_income }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                买车情况
              </template>
              {{ personalData.car_number }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                买房情况
              </template>
              {{ personalData.house_number }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                婚姻状况
              </template>
              {{ personalData.marital_status }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="个人介绍" name="3">
          <el-descriptions class="margin-top" title="个人介绍" :column="1"  border :labelStyle="styleLabel">
            <template slot="extra">
              <el-button type="primary" size="small" @click="fourDialogVisible=true">更改</el-button>
            </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                兴趣爱好
              </template>
              <el-tag closable @close="deleteHobby(item,index)" v-for="(item,index) in this.personalData.hobby" :key="index" style="margin-right: 8px;margin-bottom: 8px">
                {{ item }}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" style="width: 120px"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New</el-button>
            <!--   添加tag标签   -->
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                对另一半的要求
              </template>
              {{ personalData.requirement }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                个性签名
              </template>
              {{ personalData.personal_signature }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    <!--   账号信息弹框   -->
      <el-dialog title="更改" :visible.sync="oneDialogVisible" width="30%" @close="clearForm('one')">
        <el-form ref="oneFormRef" :model="dialogData" label-width="50px" :rules="dialogFormRules" >
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="dialogData.nickname"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateNickname">确 定</el-button>
          <el-button @click="oneDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--   基本信息弹框   -->
      <el-dialog title="更改" :visible.sync="twoDialogVisible" width="32%"  @close="clearForm('two')">
        <el-form ref="twoFormRef" :model="dialogData" label-width="80px">
          <el-form-item label="身高">
            <el-select v-model="dialogData.height" placeholder="请选择身高">
              <el-option :label="item" :value="item" v-for="(item,index) in heightData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="体重">
            <el-select v-model="dialogData.weight" placeholder="请选择体重">
              <el-option :label="item" :value="item" v-for="(item,index) in weightData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="dialogData.phone" style="width: 300px;margin-right: 20px" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="dialogData.email" style="width: 300px;margin-right: 20px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
           <el-button @click="updateUserInfo" type="primary">确定</el-button>
           <el-button @click="twoDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--   条件简介弹框   -->
      <el-dialog title="更改" :visible.sync="threeDialogVisible" width="25%" @close="clearForm('three')">
        <el-form ref="threeFormRef" :model="dialogData" label-width="80px">
          <el-form-item label="职业类别">
            <el-select v-model="dialogData.work_type" placeholder="请选择职业类别">
              <el-option label="IT行业" value="IT行业"></el-option>
              <el-option label="教育" value="教育"></el-option>
              <el-option label="医疗" value="医疗"></el-option>
              <el-option label="私营" value="私营"></el-option>
              <el-option label="国企" value="国企"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月收入">
            <el-select v-model="dialogData.monthly_income" placeholder="请选择月收入">
              <el-option label="2千以下" value="2千以下"></el-option>
              <el-option label="2千-5千" value="2千-5千"></el-option>
              <el-option label="5千-1万" value="5千-1万"></el-option>
              <el-option label="1万-2万" value="1万-2万"></el-option>
              <el-option label="2万-5万" value="2万-5万"></el-option>
              <el-option label="5万以上" value="5万以上"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="买车情况">
            <el-select v-model="dialogData.car_number" placeholder="请选择">
              <el-option label="已买" value="已买"></el-option>
              <el-option label="未买" value="未买"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="买房情况">
            <el-select v-model="dialogData.house_number" placeholder="请选择">
              <el-option label="已买" value="已买"></el-option>
              <el-option label="未买" value="未买"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="dialogData.marital_status" placeholder="请选择婚姻状况">
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="未婚" value="未婚"></el-option>
              <el-option label="离异" value="离异"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateCondition">确 定</el-button>
          <el-button @click="threeDialogVisible = false">取 消</el-button>
         </span>
      </el-dialog>
      <!--   个人条件弹框   -->
      <el-dialog title="更改" :visible.sync="fourDialogVisible" width="30%" @close="clearForm('four')">
        <el-form ref="fourFormRef" :model="dialogData" label-width="120px">
<!--          <el-form-item label="兴趣爱好">-->
<!--            <el-tag :key="tag" v-for="tag in 3" closable :disable-transitions="false">{{tag}}</el-tag>-->
<!--            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">-->
<!--            </el-input>-->
<!--            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
<!--          </el-form-item>-->
          <el-form-item label="对另一半的要求">
            <el-input v-model="dialogData.requirement" type="textarea" style="width: 250px;" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="dialogData.personal_signature"  type="textarea" style="width: 250px" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateCondition">确认</el-button>
          <el-button @click="threeDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data () {
    // 自定义验证邮箱规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号的规则
    const checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      imageUrl: '',
      // 上传头像时携带的数据
      uploadData: {
        id: window.sessionStorage.getItem('id')
      },
      styleLabel: {
        backgroundColor: '#ffffff',
        width: '353px'
      },
      // 用户数据
      userFormData: {},
      // 账号数据
      accountData: {},
      // 个人数据
      personalData: {},
      // 弹框数据
      dialogData: {
        nickname: '',
        phone: '',
        email: '',
        height: '',
        weight: '',
        requirement: '',
        personal_signature: '',
        work_type: '',
        monthly_income: '',
        car_number: '',
        house_number: '',
        marital_status: '',
        id: '',
      },
      // 账号信息弹框是否显示
      oneDialogVisible: false,
      // 基本信息弹框是否显示
      twoDialogVisible: false,
      // 个人简介弹框是否显示
      threeDialogVisible: false,
      // 个人介绍弹框是否显示
      fourDialogVisible: false,
      // 弹框验证
      dialogFormRules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        phone:[
          { type: 'number', message: '账号必须为数字'}
        ]
      },
      // input是否显示
      inputVisible: false,
      // input绑定
      inputValue: ''
    }
  },
  created() {
    // 从sessionStorage中获取用户数据
    this.userFormData = JSON.parse(window.sessionStorage.getItem('user'))
    // 获取账号数据
    this.getAccount()
    // 获取个人信息
    this.getPersonalData()
  },
  methods: {
    // 头像上传成功
    handleAvatarSuccess (res, file) {
      // 将新的user数据存储
      window.sessionStorage.setItem('user',JSON.stringify(res.data))
      this.imageUrl = 'http://localhost:8099/images/' + JSON.parse(window.sessionStorage.getItem('user')).photo

    },
    // 头像上传之前
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 获取账号数据
    async getAccount() {
      const { data: res } = await this.$http.get(`/accont/getAccont/${JSON.parse(window.sessionStorage.getItem('user')).id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('账号数据获取失败!')
      }
      this.accountData = res .data
      this.dialogData.nickname = this.accountData.nickname
    },
    // 清除表单
    clearForm(val) {
      if (val === 'one'){
        this.getAccount()
        this.dialogData.nickname=this.userFormData.nickname
        this.$nextTick(() => {
          this.$refs['oneFormRef'].resetFields()
        });
      } else if (val === 'two'){
        this.dialogData.height = ''
        this.dialogData.weight = ''
        this.dialogData.phone = ''
        this.dialogData.email = ''
      } else if (val === 'three'){
        this.dialogData.work_type = ''
        this.dialogData.monthly_income = ''
        this.dialogData.car_number = ''
        this.dialogData.house_number = ''
        this.dialogData.marital_status = ''
      }else{
        this.dialogData.requirement = ''
        this.dialogData.personal_signature = ''
      }
    },
    // 修改昵称
    updateNickname() {
      this.$refs.oneFormRef.validate( async valid => {
        if (!valid){
          return null
        }
        const { data: res } = await this.$http.get(`/accont/updateNickname/${window.sessionStorage.getItem('id')}/${this.dialogData.nickname}`)
        if (res.meta.status !== 200) {
          return this.$message.error('昵称修改失败!')
        }
        this.oneDialogVisible = false
        await this.getAccount()
        this.dialogData.nickname = this.accountData.nickname
      } )
    },
    // 修改用户基本信息
     async updateUserInfo() {
       this.dialogData.id = window.sessionStorage.getItem('id')
        const { data: res } = await this.$http.post('/user/updateUserInfo',this.dialogData)
        if (res.meta.status === 500 ){
          return this.$message.warning(res.meta.msg)
        }
        if (res.meta.status !== 200) {
          return this.$message.error('修改失败!')
        }
        this.$message.success('修改成功!')
        this.userFormData = res.data
        window.sessionStorage.setItem('user',JSON.stringify(res.data))
        this.twoDialogVisible = false
    },
    // 获取个人信息
    async getPersonalData() {
      // const { data: res } = await this.$http.get(`/condition/getPersonal/${window.sessionStorage.getItem('id')}`)
      const res = this.$store.dispatch('getPersonalData', window.sessionStorage.getItem('id'))
      res.then(result => {
        if (result.meta.status !== 200){
          return this.$message.error('个人信息获取失败!')
        }
        this.personalData = result.data
        // 将hobby以空格分开 先判断是否为空 如果为空则返回空数组
        this.personalData.hobby = result.data.hobby ? result.data.hobby.split(' ') : []
      })

    },
    // 修改条件简介
    async updateCondition(){
      this.dialogData.id = window.sessionStorage.getItem('id')
      const { data: res } = await this.$http.post('/condition/updateCondition',this.dialogData)
      if (res.meta.status == 500){
        return this.$message.error(res.meta.msg)
      }
      this.$message.success('修改成功!')
      await this.getPersonalData()
      if (this.threeDialogVisible){
        this.threeDialogVisible = false
      }else{
        this.fourDialogVisible = false
      }
    },
    // 文本框失去焦点或按下enter
    handleInputConfirm() {
      // 如果文本框中输入的值为空格 则清空文本框并返回
      if (this.inputValue.trim().length === 0){
        this.inputValue = ''
        this.inputVisible = false
        return null
      }
      // 证明数据有效 将数据去除前后空格后放入数组中
      this.personalData.hobby.push(this.inputValue.trim())
      this.inputValue = ''
      this.inputVisible = false
      this.updateHobby(this.personalData.hobby.join(' '))
    },
    // 点击按钮 切换至输入框，并获得焦点
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 修改爱好
    async updateHobby(val) {
      const { data: res } = await this.$http.get(`/condition/updateHobby/${window.sessionStorage.getItem('id')}/${val}`)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

    },
    // 删除爱好
    deleteHobby(val,index) {
      // 删除数组中的数据
      this.personalData.hobby.splice(index,1)
      this.updateHobby(this.personalData.hobby.join(' '))
    },
  },
  computed: {
    // 身高数据
    heightData() {
      const data=[]
      for (let i=145;i<=210;i++){
        data.push(i+'厘米')
      }
      return data
    },
    // 体重数据
    weightData() {
      const data=[]
      for (let i=30;i<=200;i++){
        data.push(i+'公斤')
      }
      return data
    },
    // 头像是否存在
    isPhoto() {
      if (JSON.parse(window.sessionStorage.getItem('user')).photo !== null || this.imageUrl !== ''){
        this.imageUrl = 'http://localhost:8099/images/' + JSON.parse(window.sessionStorage.getItem('user')).photo
        return true
      }else{
        return false
      }
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.main-container{
  width: 1226px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
// 头像框样式
/deep/ .el-upload--picture-card{
  width: 75px;
  height: 75px;
  line-height: 75px;
}
// 加号样式
/deep/ .avatar-uploader-icon{
  width: 28px;
  height: 28px;
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
/deep/ .el-tabs__nav-scroll{
  background-color: #ffffff;
}
</style>