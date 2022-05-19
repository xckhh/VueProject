<template>
  <div class="jwchat__body wrapper">
    <JwChat-index
        :config="config"
        :taleList="list"
        @enter="bindEnter"
        :showRightBox="false"
        v-model="inputMsg"
        scrollType="scroll"
    >
    </JwChat-index>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取的未读数据
      listData: [],
      inputMsg: '',
      // 要渲染的数据
      list: [],
      tool: {},
      config: {
        // 我的头像
        img: 'http://localhost:8099/images/'+window.sessionStorage.getItem('photo'),
        name: window.sessionStorage.getItem('username'),
        // 个性签名
        dept: '牙歪嘴裂爱耍酷，我叫志伟你记住。'
      }
    }
  },
  props: ['MyMsg', 'another_id'],
  methods: {
    // 输入框点击就发送或者回车触发的事件
    bindEnter(str) {
      // str是输入框中的数据
      const msg = this.inputMsg
      if (!msg) return;
      const msgObj = {
        "date": this.getNowTime(),
        "text": {"text": msg},
        "mine": true,
        "name": window.sessionStorage.getItem('username'),
        "img": 'http://localhost:8099/images/'+window.sessionStorage.getItem('photo'),
        "isRead": 0
      }
      this.list.push(msgObj)
      // 将我发的消息存储到会话
      window.sessionStorage.setItem('chat',JSON.stringify(this.isMine))
    },
    // 获取当前时间
    getNowTime() {
      let date = new Date();
      //年 getFullYear()：四位数字返回年份
      let year = date.getFullYear();  //getFullYear()代替getYear()
      //月 getMonth()：0 ~ 11
      let month = date.getMonth() + 1;
      //日 getDate()：(1 ~ 31)
      let day = date.getDate();
      //时 getHours()：(0 ~ 23)
      let hour = date.getHours();
      //分 getMinutes()： (0 ~ 59)
      let minute = date.getMinutes();
      //秒 getSeconds()：(0 ~ 59)
      let second = date.getSeconds();

      let time =  year + '/' + this.addZero(month) + '/' + this.addZero(day) + ' ' + this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
      return time;
    },
    addZero(s) {
      return s < 10 ? ('0' + s) : s;
    }
  },
  mounted() {
    // 封装获取的未读消息
    if (this.MyMsg.length === 18) {
      this.list = this.listData
        // 传进来的是id
    }else{
      // 传进来的是聊天记录
      for (let i = 0; i < this.MyMsg.length; i++) {
        let data = {
          date: this.MyMsg[i].date,
          name: this.MyMsg[i].another_username,
          text: {
            "text": this.MyMsg[i].text
          },
          img: 'http://localhost:8099/images/' + this.MyMsg[i].photo,
          mine: false,
          isRead: 1,
        }
        this.listData.push(data)
      }
      this.list = this.listData
    }
  },
  computed: {
    // 将我发的消息过滤出来
    isMine() {
      return this.list.filter(item => item.mine === true)
    }
  }
}
</script>
<style scoped>
</style>
<style>
.active {
  color: red;
}
.jwchat__body {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}
</style>