import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import './assets/css/font.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import store from "@/store"
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TopBar from './components/common/TopBar'
Vue.component(TopBar.name,TopBar)
import TopHeader from './components/common/TopHeader'
Vue.component(TopHeader.name,TopHeader)
import MenuBanner from './components/home/MenuBanner'
Vue.component(MenuBanner.name,MenuBanner)
import Hot from './components/home/Hot'
Vue.component(Hot.name,Hot)
import AllPartner from './components/home/AllPartner'
Vue.component(AllPartner.name,AllPartner)
import SiteFooter from "@/components/common/SiteFooter";
Vue.component(SiteFooter.name,SiteFooter)
import MyCircle from "@/components/common/Circle";
Vue.component(MyCircle.name,MyCircle)
// import chat from "@/components/chat";
// Vue.component(chat.name,chat)
//聊天室-基于element
import Chat from 'jwchat';
Vue.use(Chat)
// 全局设置 elementUI的$message的默认显示时间
const messages = ['success', 'warning', 'info', 'error'];
messages.forEach(type => {
  ElementUI.Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
      // 显示时长 1s
      options.duration = 1000;
      options.showClose = true;
    }
    options.type = type;
    return ElementUI.Message(options);
  }
})
Vue.use(ElementUI)


Vue.config.productionTip = false
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.baseURL = 'http://localhost:8099/'
// 拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须return config
  return config
})
// 时间过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})
Vue.prototype.$http = axios
Vue.prototype.$store = store
new Vue({
  router,
  store,
  render: h => h(App),
  data: {
  }
}).$mount('#app')
