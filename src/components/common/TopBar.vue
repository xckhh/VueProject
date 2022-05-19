<!--
 * @FileDescription: 页首
 * @Author:
 * @Date:
 * @LastEditors:
 * @LastEditTime:
 -->
<template>
  <!-- 顶部 -->
  <div>
    <header class="top-bar">
      <div class="bar-container">
        <!-- 内容栏 -->
        <div class="nav-container">
          <ul class="nav">
            <li class="nav-item" v-for="(item, index) in navsData" :key="index">
              <div class="item-style">
                <a v-if="item.value !== '首页'" @click="isLogin(item.url)">{{item.value}}</a>
                <router-link :to="item.url" v-else>{{item.value}}</router-link>
              </div>
              <!--   如果不是最后一个 则在后边加上|   -->
              <span class="nav-span" v-show="index !== navsData.length - 1">|</span>
            </li>
          </ul>
        </div>
        <!-- 登录注册栏 -->
        <div class="nav-login">
          <ul class="nav-login-item">
            <li class="nav-item" v-for="(item, index) in loginData" :key="index">
              <template v-if="item.value === '登陆'">
                <a style="margin-left: 5px;" v-if="isLoginData">{{ uname }}</a>
                <a style="margin-left: 5px;" v-else @click="loginDialogVisible=true">{{item.value}}</a>
              </template>
              <template v-else-if="item.value === '注册'">
                <a style="margin-left: 5px;" v-if="isLoginData" @click="logout">退出登录</a>
                <a v-else @click="registerDialogVisible=true">{{item.value}}</a>
              </template>
              <template  v-else>
                <a style="margin-left: 5px;" @click="chatClick"><el-badge :value="total" :max="99" class="item">{{item.value}}</el-badge></a>
              </template>
              <!--   如果不是最后一个 则在后边加上|   -->
              <span class="nav-span" v-show="index !== loginData.length - 1">|</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
<!-- 登录弹框 -->
    <el-dialog title="登陆" :visible.sync="loginDialogVisible" width="30%" destroy-on-close>
      <!--   登陆框   -->
      <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFromRules" label-width="60px">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginFormData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  prefix-icon="el-icon-unlock" placeholder="请输入密码" show-password v-model="loginFormData.password" onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginClick">确 定</el-button>
        <el-button @click="loginDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 注册弹框 -->
    <el-dialog :visible.sync="registerDialogVisible" width="30%" destroy-on-close @close="removeRegisterData">
      <h2 style="margin-bottom: 5px;margin-left: 10px">注册账号</h2>
      <el-form ref="registerFormRef" :model="registerFormData" :rules="registerFormRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input prefix-icon="el-icon-user" v-model="registerFormData.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  prefix-icon="el-icon-unlock" placeholder="请输入密码" show-password v-model="registerFormData.password" onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input  prefix-icon="el-icon-phone" placeholder="手机号" v-model="registerFormData.phone" onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5]/g,'')"></el-input>
        </el-form-item>
        <div style="margin-bottom: 5px">
          <h2 style="display: inline-block;margin-left: 10px">完善资料</h2> <span style="margin: 10px;color: #c4c7cf;font-size: 8px">(注册后不可更改)</span>
        </div>
        <el-form-item label="姓名" prop="name">
          <el-input  prefix-icon="el-icon-s-custom" placeholder="姓名" v-model="registerFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="registerFormData.gender" label="男">男</el-radio>
          <el-radio v-model="registerFormData.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日"  prop="birthday">
          <el-date-picker v-model="registerFormData.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="地区"  prop="address">
          <el-cascader style="width: 285px" v-model="registerFormData.address" :options="cityData" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registerClick">确 定</el-button>
        <el-button @click="registerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 聊天弹框 -->
    <el-drawer direction="ltr" size="50%" @close="insertChat" :with-header="false" :visible.sync="chatDialogVisible">
      <chat :my-msg="MyMsg"/>
    </el-drawer>
  </div>
</template>

<script>
import cityData from "@/assets/cityData/citydata";
import Chat from "@/components/chat";
export default {
  name: 'TopBar',
  data () {
    // 验证手机号的规则
    const checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    // 验证用户名是否存在
    const validateUsername = (rule,value,callback) => {
      // 验证用户名是否存在
        const res = this.$http.get(`/user/isUsername/${this.registerFormData.username}`).then(item => {
          if (item.data.meta.status !== 200){
            return  callback(new Error('用户名已被占用!'))
          }
          return callback()
        })
    }
    return {
      // 我的未读消息
      MyMsg: '',
      navsData: [
        {value: '首页',url: '/main'},
        {value: '个人中心', url: '/personCenter'},
        {value: '相册', url: '/album'},
      ],
      loginData: [
        {value: '登陆',},
        {value: '注册',},
        {value: '消息',}
      ],
      // 登录弹框是否显示
      loginDialogVisible: false,
      // 注册弹框是否显示
      registerDialogVisible: false,
      // 聊天弹框是否显示
      chatDialogVisible: false,
      // 登录框数据
      loginFormData: {
        username: 'xckhh',
        password: 'xckhhb',
      },
      // 注册框数据
      registerFormData:{
        username: 'xckhh',
        password: 'xckhhb',
        phone: '18276580766',
        name: 'xckhh',
        gender: '女',
        birthday: '',
        region: '',
        address: [],
      },
      // 登录验证规则
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      // 注册验证规则
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur'}
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        phone: [{
          required: true,
          message: '请输入手机',
          trigger: 'blur'
        },
          {
            validator: checkMobile,
            trigger: 'blur'
          }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        birthday: [
          { required: true, message: '请选择生日', trigger: 'change' },
        ],
        address: [{type: 'array', required: true, message: '请选择类别', trigger:  'change' }],
      },
      // 验证用户是否登录
      isLoginData: false,
      // 用户名
      uname: '',
      // 城市数据
      cityData,
      // 未读消息条数
      total: '',
    }
  },
  components: {
    Chat
  },
  created() {
    this.isLoginData = window.sessionStorage.getItem('id') !== null
    this.uname = window.sessionStorage.getItem('username')
  },
  methods: {
    // 登录
    loginClick () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return null
        }
        const { data: res } = await this.$http.get(`user/login/${this.loginFormData.username}/${this.loginFormData.password}`)
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        // 将登录成功后的token保存到客户端的sessionStorage(只在当前网站打开期间生效)中
        window.sessionStorage.setItem('token', res.data.token)
        // 将登录的用户的信息写入vuex
        this.$store.commit('setUser',res.data)
        // 将数据存入sessionStorage
        window.sessionStorage.setItem('user',JSON.stringify(res.data))
        window.sessionStorage.setItem('id',res.data.id)
        window.sessionStorage.setItem('username',res.data.username)
        window.sessionStorage.setItem('photo',res.data.photo)
        this.loginDialogVisible = false
        this.isLoginData = true
        this.uname = res.data.username
        // 获取未读消息
        await this.getUserChat(res.data.username)
      })
    },
    // 退出登录
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到首页
      this.userInfo = {}
      this.isLoginData=false
      if(this.$route.path!='/main'){
        this.$router.push({
          path:'/main',
        })
      }
      this.$message.success('退出登录成功!')
    },
    // 点击导航
    isLogin (url) {
      if (window.sessionStorage.getItem('token') === null) {
        return this.$notify({
          title: '提示',
          message: '请先进行登录操作',
          offset: 30
        });
      }else{
        if(this.$route.path!=url){
          this.$router.push(url)
        }
      }
    },
    // 注册
    registerClick() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) {
          return null
        }
        this.registerFormData.region = ''
        // 因为下拉框选中的值为数组 所以转为字符串
        for (let i=0; i<this.registerFormData.address.length; i++) {
          this.registerFormData.region += this.registerFormData.address[i]
        }
        const { data: res } = await this.$http.post('/user/register',this.registerFormData)
        if (res.meta.status !== 200) {
          return this.$message.error('注册失败!')
        }
        this.$message.success('注册成功!')
        this.registerDialogVisible = false
      })
    },
    // 注册弹框关闭时清除数据
    removeRegisterData() {
      this.$refs.registerFormRef.resetFields()
      this.registerFormData.address = []
    },
    // 点击消息
    chatClick() {
      if (window.sessionStorage.getItem('token') === null) {
        return this.$notify({
          title: '提示',
          message: '请先进行登录操作',
          offset: 30
        });
      }else {
        if (this.total === ''){
          return this.$notify({
            title: '提示',
            message: '暂无消息',
            offset: 30
          });
        }
        this.total = ''
        this.chatDialogVisible = true
      }
    },
    // 获取未读信息 并标记为已读
    getUserChat(username) {
      this.$store.dispatch('getUserChat',username).then(res => {
        this.MyMsg= res.data
        window.sessionStorage.setItem('another_username',this.MyMsg[0].another_username)
        this.total = this.MyMsg.length
      })
      this.$http.get(`/chat/update/${username}`)
    },
    // 关闭聊天框将我发送的聊天数据存储
    insertChat() {
      const dataList = []
      // console.log('ssss'+window.sessionStorage.getItem('chat'))
      if ( JSON.parse(window.sessionStorage.getItem('chat')) === null){
        // this.$http.post('/chat/insertUserChat',dataList)
        return null
      } else{
        JSON.parse(window.sessionStorage.getItem('chat')).forEach(item => {
          let data = {
            username: window.sessionStorage.getItem('another_username'),
            another_username: window.sessionStorage.getItem('username'),
            text: item.text.text,
            date: item.date,
            isRead: 0
          }
          dataList.push(data)
        })
        this.$http.post('/chat/insertUserChat',dataList)
      }
    },
  },
  computed: {
  },
  watch:{
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 40px;
  background-color: #333;
  .bar-container {
    width: 1226px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .nav-container {
      display: inline-block;
      .nav-item {
        .item-style {
          a {
            display: inline-block;
            font-size: 12px;
            color: #b0b0b0;
            line-height: 40px;
            text-decoration: none;
          }
          a:hover {
            color: #ffffff;
          }
        }
      }
    }
  }
}
/deep/ .el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(15%) translateX(130%);
}
/deep/ .el-dialog__body {
  padding: 0px 20px;
}
.nav-login {
  display: flex;
  .nav-login-item {
    a {
      font-size: 12px;
      color: #b0b0b0;
      line-height: 40px;
      text-decoration: none;
    }
    a:hover {
      color: #ffffff;
    }
  }
}

.nav-span {
  color: #424242;
  font-family: sans-serif;
  line-height: 40px;
  margin: 0 5px;
}

.nav-item {
  height: 40px;
  line-height: 40px;
  display: inline-block;
  position: relative;
  .item-style {
    display: inline-block;
  }
}
.el-dialog {
  .el-input{
    width: 85%;
  }

}
/deep/ .ChatBox{
  margin-bottom: 30px;
}
</style>