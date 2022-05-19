import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    // 通过id获取用户信息
    async getUserById(context,id){
      const { data: res } = await axios.get(`/user/getUserById/${id}`)
      return res
    },
    // 通过id获取条件信息
    async getPersonalData(context,id){
      const { data: res } = await axios.get(`/condition/getPersonal/${id}`)
      return  res
    },
    // 通过id获取相册信息
    async getAlbum(context,id) {
      const { data: res } = await axios.get(`/album/getAlbumList/${id}`)
      return res
    },
    // 通过相册id获取图片信息
    async getPhotoList(context,album_id) {
      const { data: res } = await axios.get(`/photo/getPhotoList/${album_id}`)
      return  res
    },
    // 获取用户集合
    async getUserList(context){
      const { data: res } = await axios.get('/user/getUserList')
      return res
    },
    // 获取我的未读消息
    async getUserChat(context,user_id){
      const { data: res } = await axios.get(`/chat/${user_id}`)
      return res
    },
    // 存储聊天记录
    async insertChat(context,chatList){
      console.log(chatList)
      const { data: res } = await axios.post('/chat',chatList)
      console.log(res)
    }
  },
  modules: {
    user
  }
})
